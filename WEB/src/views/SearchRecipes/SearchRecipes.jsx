import React, { useState, useContext } from "react";
import axios from "axios";
import { searchRecipes } from "../../services/RecipeService";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import "./SearchRecipes.css"

function SearchRecipes() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ingredients === "") {
      setError("Please enter ingredients");
    } else {
      searchRecipes(ingredients)
        .then((data) => {
          let json = JSON.parse(data.result);

          if (data && data.result) {
            setRecipe(json);
            setIngredients("");
          } else {
            setError("Invalid response from API");
          }
        })
        .catch((err) => {
          console.log(err);
          setError("Error fetching data: " + error);
        });
    }
  };

   const handleSave = () => {
      setSavedRecipes(savedRecipes => [...savedRecipes, recipe]);
    };

    return (
      <div className="">
        <form onSubmit={handleSubmit}>
          <label>
            Type your ingredients to get your recipe
            <input type="text" value={ingredients} onChange={handleInputChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
        {error && <p className="error">{error}</p>}
  
        {recipe && (
          <div>
            <RecipeCard recipe={recipe}>
              <div className="d-flex justify-content-between">
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
              </div>
            </RecipeCard>
          </div>
        )}
      </div>
    );
  }
  
  export default SearchRecipes;