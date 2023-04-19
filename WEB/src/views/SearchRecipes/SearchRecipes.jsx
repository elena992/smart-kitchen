import React, { useState, useContext } from "react";
import axios from "axios";
import { searchRecipes } from "../../services/RecipeService";

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
        <div className="card h-100 p-2">
          <div className="card-body">
            <h5 className="card-title text-body">{recipe.name}</h5>
          </div>
        </div>
      )}
      {recipe && (
        <div className="card h-100 p-2">
          <div className="card-body">
            <h5 className="card-title text-body">{recipe.servings}</h5>
          </div>
        </div>
      )}
      {recipe && (
        <div className="card h-100 p-2">
          <div className="card-body">
            <h5 className="card-title text-body">{recipe.ingredients}</h5>
          </div>
        </div>
      )}
      {recipe && (
        <div className="card h-100 p-2">
          <div className="card-body">
            <h5 className="card-title text-body">{recipe.instructions}</h5>
          </div>
        </div>
      )}
      {recipe && (
        <div className="card h-100 p-2">
          <div className="card-body">
            <h5 className="card-title text-body">{recipe.notes}</h5>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchRecipes;
