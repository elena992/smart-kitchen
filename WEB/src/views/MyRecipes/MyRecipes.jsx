import React, { useEffect, useState } from "react";
import { getRecipesByCurrentUser } from "../../services/RecipeService";
import SimpleCard from "../../components/SimpleCard/SimpleCard";
import { useNavigate } from "react-router-dom";
import "./MyRecipes.css";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
    <div className="row my-3 recipes">
      {isLoading ? (
        <p>Loading...</p>
      ) : recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3"
          >
            <SimpleCard
              recipe={recipe}
              linkTo={`/detail-recipe/${recipe._id}`}
            ></SimpleCard>
          </div>
        ))
      ) : (
        <p>No recipes found</p>
      )}
    </div>
  );
};

export default MyRecipes;
