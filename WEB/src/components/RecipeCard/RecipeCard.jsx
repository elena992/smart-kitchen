import React from "react";
import "./RecipeCard.css";

const RecipeCard = ({ recipe, children }) => {
  return (
    <div className="card-recipe">
      <img
        className="card-recipe-img-top"
        src={recipe.photo}
        alt={recipe.name}
      />
      <div className="card-recipe-body">
        <h5 className="card-recipe-headline">{recipe.name}</h5>
        <p className="card-recipe-text">{recipe.servings} servings</p>
        <p className="card-recipe-text">{recipe.ingredients}</p>
        <p className="card-recipe-text">{recipe.instructions}</p>
        <p className="card-recipe-text">{recipe.notes}</p>
        {children}
      </div>
    </div>
  );
};

export default RecipeCard;
