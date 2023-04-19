import React, { useEffect, useState } from "react";
import { getRecipesByUser } from "../../services/RecipeService";
import RecipeCard from "../RecipeCard/RecipeCard";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipesByUser()
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>My Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;