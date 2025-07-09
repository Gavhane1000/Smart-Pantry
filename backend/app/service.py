from app import util
from app import constants
import json

def generate_recipes(ingredients, diet_type, category, people, have_basic_indredients, notes):
    try:
        prompt_for_recipe = constants.PROMPT_FOR_RECIPES.format(ingredients=ingredients, diet_type=diet_type, notes=notes, category=category, basic_ingredients=have_basic_indredients,people=people)
        response = util.ask_llm(prompt_for_recipe)
        print(f"LLM Response :: {response}")
        return json.loads(response)
    
    except Exception as e:
        raise e
    
def get_clarity_from_llm(ingredients_used, instructions, title, question, converstion_summary):
    try:
        # Till date summary with new question
        # Before return again create new summary
        prompt_for_clarity = constants.PROMPT_FOR_CLARITY.format(title=title, ingredients=ingredients_used, instructions=instructions, summary=converstion_summary, question=question)
        response = util.ask_llm(prompt_for_clarity)
        newSummary = util.get_summary(converstion_summary, question, response)
        final_response = {
            "title": title,
            "ingredients_used": ingredients_used,
            "instructions": instructions,
            "converstion_summary": newSummary,
            "response": response
            }
        
        return final_response
    
    except Exception as e:
        raise e
    
def chat_with_agent(question, summary):
    try:
        prompt_for_conversation = constants.PROMPT_FOR_CONVERSATION.format(summary=summary, question=question)
        lm_answers = util.ask_llm(prompt_for_conversation)
        prompt_for_summary = constants.PROMPT_FOR_SUMMARIZATION.format(summary=summary, question=question, response=lm_answers)
        summary = util.ask_llm(prompt_for_summary)
        final_response = {
            "question": question,
            "lm_response": lm_answers,
            "summary": summary
        }
        return final_response
    
    except Exception as e:
        raise e