import os
import requests
from dotenv import load_dotenv
load_dotenv()
import requests
# from serpapi import GoogleSearch
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route("/")
def agent_api_info():
    return jsonify({"response":"agent running at port 3000"})


@app.route("/tool", methods=["POST"])
def tech_news_agent():

    data = request.json
    prompt = data.get("query","")
    startIndex = data.get("startIndex","")

    params = {
    "engine": "google_news",
    "q": prompt,
    "start": startIndex,
    "gl": "us",
    "hl": "en",
    "api_key": os.getenv("SERPAPI_API_KEY")
    }

    res = requests.get("https://serpapi.com/search.json", params=params)
    data = res.json()

    return data["news_results"]

if __name__ == "__main__":
    app.run(port=os.getenv("PORT") , host="0.0.0.0", debug=False)