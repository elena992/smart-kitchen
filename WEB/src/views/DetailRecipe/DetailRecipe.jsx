import React, { useEffect, useState } from "react";
import { getRecipeById, updateRecipe, deleteRecipes} from "../../services/RecipeService.js";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useParams } from "react-router-dom";

const DetailRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  //const [name, setName] = useState("");
  //const [ingredients, SetIngredients] = useState("");
 // const [instructions, SetInstructions] = useState("");

  useEffect(() => {
    getRecipeById(id)
      .then((response) => {
        setRecipe(response);
       // setName(response.name);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

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
/*
  const handleCancelClick = () => {
    setIsEditing(false);
    setName(recipe.name);
  };

  const handleSaveClick = () => {
    const updatedRecipe = {
      ...recipe,
      name: name,
      ingredients: ingredients.split(", "),
      instructions: instructions
    };
  
    updateRecipe(recipe._id, updatedRecipe)
      .then((response) => {
        setRecipe(response);
        setIsEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
*/
/*
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleIngredientsChange = (event) => {
    setIngredients(event.target.value);
  };
  
  const handleInstructionsChange = (event) => {
    setInstructions(event.target.value);
  };  
*/
return (
  <div>
    {isLoading ? (
      <p>Loading...</p>
    ) : recipe ? (
      <div className="">
        <RecipeCard recipe={recipe}>
          <div className="d-flex justify-content-between">
            <button onClick={handleEditClick} className="btn btn-primary">
              Edit
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
    }

export default DetailRecipe;
