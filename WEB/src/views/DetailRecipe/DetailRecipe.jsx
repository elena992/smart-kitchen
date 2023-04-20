import React, { useEffect, useState } from "react";
import { getRecipesByCurrentUser } from "../../services/RecipeService";
import RecipeCard from '../../components/RecipeCard/RecipeCard'

const DetailRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRecipesByCurrentUser()
      .then((response) => {
        setRecipes(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe._id} className="">
          <RecipeCard recipe={recipe}>
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary">Edit</button>
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary">Delete</button>
              </div>
            </RecipeCard>
          </div>
        ))
      ) : (
        <p>No recipes found</p>
      )}
    </div>
  );
};

export default DetailRecipe;
