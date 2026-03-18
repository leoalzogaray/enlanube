// script.js
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (!message) return;

    // Mostrar mensaje del usuario
    appendMessage('Tú', message);
    userInput.value = '';

    try {
        // Llamada a tu API de Vercel
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: message })
        });

        const data = await response.json();
        
        if (data.response) {
            appendMessage('Asistente', data.response);
        } else {
            appendMessage('Error', 'No pude conectar con el agente.');
        }
    } catch (error) {
        console.error('Error:', error);
        appendMessage('Error', 'Hubo un problema en la conexión.');
    }
});

function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.style.marginBottom = '10px';
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}