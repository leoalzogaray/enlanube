import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import vertexai
from vertexai.generative_models import GenerativeModel

app = Flask(__name__)
CORS(app) # Esto evita los bloqueos que tenías en GitHub

# 1. Configuración de Identidad (Extraída de Google Cloud)
PROJECT_ID = os.environ.get("GOOGLE_CLOUD_PROJECT")
LOCATION = "us-central1" # O la región que elegiste en Vertex

vertexai.init(project=PROJECT_ID, location=LOCATION)

# 2. El motor Gemini 1.5 Flash (Rápido y eficiente)
model = GenerativeModel("gemini-1.5-flash")

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("prompt")

        if not user_message:
            return jsonify({"error": "No se recibió mensaje"}), 400

        # 3. Aquí inyectamos tu Prompt Maestro (Tu "Constitución")
        # Esto asegura que siempre conteste como Leonardo Alzogaray
        chat_session = model.start_chat(history=[])
        
        system_instruction = (
            "Eres el asistente de LeonardoAlzogaray.com. Leonardo tiene 33 años en IT (desde 1993). "
            "Es Técnico en Dirección de Empresas (UCUDAL) y especialista en Proyectos (UCU Business School). "
            "Se está especializando en PL-900. No menciones organismos públicos. "
            "Usa un tono profesional, senior y honesto."
        )

        full_prompt = f"{system_instruction}\n\nUsuario: {user_message}"
        
        response = chat_session.send_message(full_prompt)
        
        return jsonify({"response": response.text})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500

# Vercel necesita que el objeto 'app' esté disponible
if __name__ == "__main__":
    app.run()