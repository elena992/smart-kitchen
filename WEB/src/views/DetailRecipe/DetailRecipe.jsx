import React, { useEffect, useState } from "react";
import { getRecipeById, deleteRecipes } from "../../services/RecipeService.js";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useParams } from "react-router-dom";
import "./DetailRecipe.css";

const DetailRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRecipeById(id)
      .then((response) => {
        setRecipe(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id]);


  const handleDeleteClick = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this recipe?"
    );
    if (confirmed) {
      deleteRecipes(id)
        .then(() => {
          window.location.href = "/my-recipes";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="detail-recipe">
      {isLoading ? (
        <p>Loading...</p>
      ) : recipe ? (
        <div className="">
          <RecipeCard recipe={recipe}>
            <div className="d-flex justify-content-between">
            <button
                className="btn btn-primary"
                onClick={() => {
                  window.location.href = "/my-recipes";
                }}
              >
               Back
              </button>
              <button
                onClick={() => handleDeleteClick(recipe._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </RecipeCard>
        </div>
      ) : (
        <p>Recipe not found</p>
      )}
    </div>
  );
};

export default DetailRecipe;
