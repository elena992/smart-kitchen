import React from "react";

const RecipeCard = ({ recipe, children }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={recipe.photo}
        alt={recipe.name}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">
          {recipe.name} - {recipe.servings} servings
        </h5>
        <p className="card-text">{recipe.ingredients}</p>
        <p className="card-text">{recipe.instructions}</p>
        <p className="card-text">{recipe.notes}</p>
        {children}
    </div>
    </div>

  );
};

export default RecipeCard;


