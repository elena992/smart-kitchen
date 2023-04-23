import React, { useState, useContext } from "react";
import axios from "axios";
import { saveImage, searchRecipes } from "../../services/RecipeService";
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

  const handleSaveImage = () => {
    saveImage(
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ywYhsCJYdzU40YRHvCuA0Zkt/user-AVnaXDYnNvnHqV0M2KJPrZnI/img-56cdhIDuuiT6dHujW4ZwcpKm.png?st=2023-04-23T14%3A58%3A47Z&se=2023-04-23T16%3A58%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-23T15%3A58%3A47Z&ske=2023-04-24T15%3A58%3A47Z&sks=b&skv=2021-08-06&sig=wEGOiRNRnFqQ8CV7Cov9SBcAloVZzTmrKUGouZpygJA%3D"
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
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
      <button className="btn btn-primary" onClick={handleSaveImage}>
        TEST SAVE IMAGE
      </button>
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
