import React, { useEffect, useState } from "react";
import { getRecipesByCurrentUser } from "../../services/RecipeService";
import { getRecipeById } from "../../services/RecipeService";
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import { useParams } from "react-router-dom";

const DetailRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRecipeById(id)
      .then((response) => {
        console.log(response);
        setRecipe(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : recipe ? (
        <div className="">
          <RecipeCard recipe={recipe}>
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary">Edit</button>
            </div>
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary">Delete</button>
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