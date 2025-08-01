import React, { useState } from "react";
import useFormStore from "../store/recipeStore";
import "./recipeCards.css";

const RecipeCards = () => {
  const recipes = useFormStore((state) => state.responseData);
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!recipes || recipes.length === 0) return <p>No recipes found.</p>;

  return (
    <div className="recipe-card-container">
      {recipes.map((recipe, idx) => {
        const instructions = recipe.instructions.split("\n");
        const isExpanded = expandedIndex === idx;

        return (
          <div className="recipe-card-outer">
            <span className="recipe-title" title={recipe.title}>
              {recipe.title}
            </span>
            <div key={idx} className="recipe-card">
              <div className="nutrition">
                <span className="protein">
                  <span>Protein:</span> <strong>{recipe.protine}</strong>
                </span>
                <span className="carbs">
                  <span>Carbs:</span> <strong>{recipe.carbs}</strong>
                </span>
                <span className="fats">
                  <span>Fats:</span> <strong>{recipe.fats}</strong>
                </span>
              </div>
              <span
                className="additional-nutrition"
                title={recipe.additional_nutritions}
              >
                {recipe.additional_nutritions}
              </span>

              <div className="ingredients">
                <strong>Ingredients Used:</strong>
                <ul className="ingredient-list">
                  {recipe.ingredients_used.map((ing, i) => (
                    <li key={i} className="ingredient-item">
                      {ing.name}: {ing.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="instructions">
                <strong>Instructions:</strong>
                <ul className="instruction-list">
                  {instructions.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>
              <div className="more-btn">
                <button className="btn" onClick={() => alert(recipe.title)}>
                  More
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeCards;
