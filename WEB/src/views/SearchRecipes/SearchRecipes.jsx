import React, { useState, useContext } from "react";
import axios from "axios";
import { searchRecipes } from "../../services/RecipeService";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { createRecipe, getImageFromPrompt } from "../../services/RecipeService";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import "./SearchRecipes.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SearchRecipes() {
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);
  const [isLoadingRecipeImage, setIsLoadingRecipeImage] = useState(false);
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
      setError(null);
      setIsLoadingRecipe(true);
      searchRecipes(ingredients)
        .then((data) => {
          let json = JSON.parse(data.result);
          if (data && data.result) {
            setRecipe(json);
            setIngredients("");
            setIsLoadingRecipe(false);
            setIsLoadingRecipeImage(true);
            getImageFromPrompt(json.name)
              .then((data) => {
                console.log(data.image);
                setRecipe((prevRecipe) => {
                  return {
                    ...prevRecipe,
                    photo: data.image,
                  };
                });
                setIsLoadingRecipeImage(false);
              })
              .catch((err) => {
                console.log(err);
              });
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
    createRecipe(recipe)
      .then((response) => {
        toast.success("Recipe saved!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setRecipe(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="recipes-layout">
      <form className="form-column" onSubmit={handleSubmit}>
        <label>Type your ingredients to get your recipe</label>
        <input type="text" value={ingredients} onChange={handleInputChange} />
        {isLoadingRecipe ? (
          <div className="loading">
            <LoadingIndicator></LoadingIndicator>
          </div>
        ) : (
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        )}
      </form>

      {error && <p className="error">{error}</p>}
      {recipe && (
        <div className="">
          <RecipeCard recipe={recipe}>
            <div className="d-flex justify-content-between">
              {isLoadingRecipeImage ? (
                <LoadingIndicator></LoadingIndicator>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={!recipe}
                >
                  Save
                </button>
              )}
            </div>
          </RecipeCard>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default SearchRecipes;
