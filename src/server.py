from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)


@app.route("/generate", methods=["POST"])
def generate():
  data = request.json
  prompt = data.get("prompt")

  if not prompt:
    return jsonify({"error": "No prompt provided"}), 400
  
  try:
      response = openai.chat.completions.create(
        model="gpt-3.5-turbo",  # Cheapest model for chat/story tasks
        messages=[
            {"role": "system", "content": "You are a helpful story-writing assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=250
      )
      
      story = response.choices[0].message.content
      print ("Generated story:", story, "\n")
      return jsonify([{"story": story}])

  except Exception as e:
      print("Error generating response:", str(e))
      return jsonify({"error": str(e)}), 500
  
if __name__ == "__main__":
  app.run(debug=True, port=3001)