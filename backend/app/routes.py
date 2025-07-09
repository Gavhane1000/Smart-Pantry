from flask import Blueprint, jsonify, request
from .service import *
bp = Blueprint('api', __name__)
from flasgger import swag_from

@bp.route('/get_recipes', methods=['POST'])
@swag_from({
	"parameters": [
	{
		"in": "body",
		"name": "body",
		"required": True,
		"schema": {
			"type": "object",
			"properties": {
				"ingredients": {
					"type": "array",
					"items": {
						"type": "object",
						"properties": {
							"name": {"type": "string"},
							"quantity": {"type": "string"}
						}
					}
				},
				"diet_type": {"type": "string"},
				"category":{"type": "string"},
				"people_count":{"type": "integer"},
				"basic_ingredients":{"type": "boolean"},
				"notes": {"type": "string"}
			}
		}
	}
	],
		"responses": {
			200: {
				"description": "List of Recipes",
				"example": {
					"application/json": {
						"data": {},
						"status": "success",
						"message": "Data fetch success",
					}
				},
			},
		},
})

def get_recipes():
	try:
		data = request.get_json()
		ingredients = data.get("ingredients", [])
		diet_type = data.get("diet_type", "any")
		category = data.get("category", "any")
		people = data.get("people_count", 1)
		have_basic_indredients = data.get("basic_ingredients", True)
		notes = data.get("notes", "")
		
		recipes = generate_recipes(ingredients, diet_type, category, people, have_basic_indredients, notes)
		
		return jsonify({
			"status": "success",
			"message": "Data fetch success", 
			"data": recipes
			}), 200
	
	except Exception as e:
		return jsonify({
			"status": "error",
			"message": f'Error fetching recipes {str(e)}',
			"data": ""
		}), 500


@bp.route('/get_clarity', methods=['POST'])
@swag_from({
	"parameters": [
	{
		"in": "body",
		"name": "body",
		"required": True,
		"schema": {
			"type": "object",
			"properties": {
				"title":{"type": "string"},
				"ingredients_used":{"type": "array", "items":{"type": "string"}},
				"instructions":{"type": "string"},
				"question":{"type": "string"},
				"converstion_summary": {"type":"string"}
			}
		}
	}
	],
		"responses": {
			200: {
				"description": "Clarity",
				"example": {
					"application/json": {
						"data": {},
						"status": "success",
						"message": "Data fetch success",
					}
				},
			},
		},
})

def get_clarity():
	try:
		data = request.get_json()
		ingredients_used = data.get("ingredients_used")
		instructions = data.get("instructions")
		title = data.get("title")
		question = data.get("question")
		converstion_summary = data.get("converstion_summary")

		clarity = get_clarity_from_llm(ingredients_used, instructions, title, question, converstion_summary)
		
		return jsonify({
			"status": "success",
			"message": "Data fetch success", 
			"data": clarity
			}), 200
	
	except Exception as e:
		return jsonify({
			"status": "error",
			"message": f'Error fetching clarity {str(e)}',
			"data": ""
		}), 500


@bp.route('/catbot', methods=['POST'])
@swag_from({
	"parameters": [
	{
		"in": "body",
		"name": "body",
		"required": True,
		"schema": {
			"type": "object",
			"properties": {
				"question":{"type": "string"},
				"summary":{"type": "string"}
			}
		}
	}
	],
		"responses": {
			200: {
				"description": "Chat-Bot",
				"example": {
					"application/json": {
						"data": {},
						"status": "success",
						"message": "Data fetch success",
					}
				},
			},
		},
})

def chatbot():
	try:
		data = request.get_json()
		question = data.get("question")
		summary = data.get("summary")

		chatbot_response = chat_with_agent(question, summary)
		
		return jsonify({
			"status": "success",
			"message": "Data fetch success", 
			"data": chatbot_response
			}), 200
	
	except Exception as e:
		return jsonify({
			"status": "error",
			"message": f'Error responding to user {str(e)}',
			"data": ""
		}), 500
