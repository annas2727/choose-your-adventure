from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

HF_API_KEY = os.getenv("HF_API_KEY")
HF_MODEL_ENDPOINT = "https://api-inference.huggingface.co/models/gpt2"
#"https://api-inference.huggingface.co/models/TeeZee/DarkForest-20B-v2.0"

headers = {
  "Authorization": f"Bearer {HF_API_KEY}",
  "Content-Type": "application/json"
}

@app.route("/generate", methods=["POST"])
def generate():
  data = request.json
  prompt = data.get("prompt")

  if not prompt:
    return jsonify({"error": "No prompt provided"}), 400
  
  payload = {
        "inputs": prompt,
        "parameters": {
            "max_length": 250,
            "do_sample": True,
            "top_p": 0.95,
            "temperature": 0.7
        }
  }

  try:
      response = requests.post(HF_MODEL_ENDPOINT, headers=headers, json=payload)
      response.raise_for_status()
      result = response.json()

      story = result[0]["generated_text"] if isinstance(result, list) else result.get("generated_text", "No text returned.")
      return jsonify([{"story": story}])

  except requests.exceptions.RequestException as e:
      print("Error generating response:", str(e))
      return jsonify({"error": str(e)}), 500
  
if __name__ == "__main__":
  app.run(debug=True, port=3001)