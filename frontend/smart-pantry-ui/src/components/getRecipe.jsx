import React, { useState, useEffect } from "react";
import "./getRecipe.css";
import chef from "../assets/chef.png";
import dish from "../assets/dish.png";
import dish1 from "../assets/dish1.png";
import { submitFormData } from "../service/service";
import useFormStore from "../store/recipeStore";
import RecipeCards from "./recipeCards";

const GetRecipe = () => {
  const [formData, setFormData] = useState({
    ingredients: [],
    diet_type: "",
    category: "",
    people: 1,
    have_basic_ingredients: false,
    notes: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const images = [chef, dish1, dish];

  useEffect(() => {
  if (showResult) return; // Stop rotating when result shown
  const intervalId = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, 4000);

  return () => clearInterval(intervalId);
}, [showResult]);

  const ingredientOptions = [
    "Tomato",
    "Onion",
    "Cheese",
    "Egg",
    "Bread",
    "Oil",
    "Peanuts",
  ];
  const dietTypes = ["Vegetarian", "Non-Vegetarian", "Vegan"];
  const categories = ["Breakfast", "Lunch", "Dinner", "Snack"];

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;

    let updatedValue;

    if (type === "select-multiple") {
      updatedValue = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
    } else if (type === "checkbox") {
      updatedValue = checked;
    } else {
      updatedValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    setFormErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      if (name === "diet_type" && value) delete updatedErrors.diet_type;
      if (name === "category" && value) delete updatedErrors.category;
      if (name === "people" && value > 0) delete updatedErrors.people;
      return updatedErrors;
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Form submitted:", formData);
    try {
      const response = await submitFormData(formData);
      useFormStore.getState().setResponseData(response);
      setShowResult(true); 
      console.log("Form submitted successfully:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (formData.ingredients.length === 0) {
      errors.ingredients = "Please select at least one ingredient.";
    }
    if (!formData.diet_type) {
      errors.diet_type = "Please select a diet type.";
    }
    if (!formData.category) {
      errors.category = "Please select a category.";
    }
    if (!formData.people || formData.people <= 0) {
      errors.people = "Number of people must be greater than 0.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="get-recipe-section">
      <div className="recipe-section">
        <span className="recipe-heading">Try it Out</span>
        <br />
        <span className="recipe-sub-heading">
          Let’s cook up something amazing together
        </span>
      </div>

      <div className="get-recipe-container">
        <div className="form-container">
          <div className="form">
            <form onSubmit={handleSubmit} className="form-inner">
              {/* Ingredients */}
              <span className="form-heading">Get Recipes</span>

              <div className="form-group">
                <label>Ingredients:</label>
                <div className="ingredient-select-row">
                  <select
                    name="ingredient-select"
                    onChange={(e) => {
                      const selected = e.target.value;
                      if (
                        selected &&
                        !formData.ingredients.some(
                          (ing) => ing.name === selected
                        )
                      ) {
                        setFormData({
                          ...formData,
                          ingredients: [
                            ...formData.ingredients,
                            { name: selected, quantity: "" },
                          ],
                        });

                        setFormErrors((prevErrors) => {
                          const updated = { ...prevErrors };
                          delete updated.ingredients;
                          return updated;
                        });
                      }

                      e.target.value = "";
                    }}
                    className="input"
                    defaultValue=""
                  >
                    <option value="">-- Select Ingredients --</option>
                    {ingredientOptions
                      .filter(
                        (item) =>
                          !formData.ingredients.some(
                            (ing) => ing.name === item
                          )
                      )
                      .map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                  </select>
                </div>
                {formErrors.ingredients && (
                  <p className="error-text">{formErrors.ingredients}</p>
                )}
                <div className="tag-container grid-tag-container">
                  {formData.ingredients.map((ing, index) => (
                    <div key={ing.name} className="tag-row">
                      <span className="ingredient-name">{ing.name}</span>
                      <input
                        type="text"
                        placeholder="Qty"
                        value={ing.quantity}
                        onChange={(e) => {
                          const newIngredients = [...formData.ingredients];
                          newIngredients[index].quantity = e.target.value;
                          setFormData({
                            ...formData,
                            ingredients: newIngredients,
                          });
                        }}
                        className="ingredient-qty-input"
                      />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => {
                          const updatedIngredients = formData.ingredients.filter(
                            (_, i) => i !== index
                          );
                          setFormData({
                            ...formData,
                            ingredients: updatedIngredients,
                          });

                          if (updatedIngredients.length === 0) {
                            setFormErrors((prev) => ({
                              ...prev,
                              ingredients:
                                "Please select at least one ingredient.",
                            }));
                          }
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diet Type */}
              <div className="form-group">
                <label>Diet Type:</label>
                <select
                  name="diet_type"
                  value={formData.diet_type}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">-- Select Type --</option>
                  {dietTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {formErrors.diet_type && (
                  <p className="error-text">{formErrors.diet_type}</p>
                )}
              </div>

              {/* Category */}
              <div className="form-group">
                <label>Category:</label>
                <div className="radio-group">
                  {categories.map((cat) => (
                    <label key={cat}>
                      <input
                        className="option"
                        type="radio"
                        name="category"
                        value={cat}
                        checked={formData.category === cat}
                        onChange={handleChange}
                      />
                      <span className="ml-1 text-lg">{cat}</span>
                    </label>
                  ))}
                </div>
                {formErrors.category && (
                  <p className="error-text">{formErrors.category}</p>
                )}
              </div>

              {/* People */}
              <div className="form-group">
                <label>Number of People:</label>
                <input
                  type="number"
                  name="people"
                  min={1}
                  value={formData.people}
                  onChange={handleChange}
                  className="input"
                />
                {formErrors.people && (
                  <p className="error-text">{formErrors.people}</p>
                )}
              </div>

              {/* Basic Ingredients Checkbox */}
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="have_basic_ingredients"
                    checked={formData.have_basic_ingredients}
                    onChange={handleChange}
                  />
                  <span className="ml-2">I have basic ingredients</span>
                </label>
              </div>

              {/* Notes */}
              <div className="form-group">
                <label>Notes:</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="input textarea"
                />
              </div>

              {/* Submit */}
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Image Rotation Section */}
        <div className="image-rotate-container">
          {showResult ? (
            <RecipeCards />
          ) : (
            <img className="chef-dish" src={images[currentIndex]} alt="Rotating" />
          )}
        </div>
      </div>
    </div>
  );
};

export default GetRecipe;
