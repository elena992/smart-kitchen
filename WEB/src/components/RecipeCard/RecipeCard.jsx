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
        <p className="card-recipe-text">{recipe.servings} portions</p>
        <div>
          <h4>Ingredients</h4>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Method</h4>
          <ol>
            {recipe.instructions.map((ingredien, index) => (
              <li key={index}>{ingredien}</li>
            ))}
          </ol>
        </div>
        <p className="card-recipe-text">Notes: {recipe.notes}</p>
        {children}
      </div>
    </div>
  );
};

export default RecipeCard;
