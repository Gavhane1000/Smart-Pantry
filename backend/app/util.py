import requests
import os
from app import constants

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyAgOpUeeYmHvy_6v1tSDnzKWQzx_clJFSo")
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY

def ask_llm(prompt):
	url = GEMINI_URL
	headers = {
		"Context-type":"application/json"
	}
	payload = {
		"contents": [
			{
				"parts": [
					{
						"text": prompt
					}
				]
			}
		]
	}

	try:
		response = requests.post(url, headers=headers, json=payload)
		response.raise_for_status()
		candidates = response.json().get("candidates", [])
		if candidates:
			return candidates[0]["content"]["parts"][0]["text"]
		return "[No content returned]"
	except requests.RequestException as e:
		return f"[Gemini HTTP Error] {e}"
	except Exception as e:
		return f"[Unexpected Error] {e}"

def get_summary(old_summary, user_request, lm_response):
	try:
		prompt = constants.PROMPT_FOR_SUMMARIZATION.format(summary=old_summary, question=user_request, response=lm_response)
		response = ask_llm(prompt)
		return response
	except Exception as e:
		raise e