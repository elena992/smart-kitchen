import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { myRecipes, editRecipe, deleteRecipe } from "../../services/RecipeService.js";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

/*
const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const navigate = useNavigate();
  
    const fetchRecipes = useCallback(
      () =>
        myRecipes(currentUser.id)
          .then((recipes) => {
            setRecipes(recipes);
          })
          .catch((err) => console.log(err)),
      [currentUser.id]
    );
  
    const handleEditRecipe = (recipe) => {
        setEditingRecipe(recipe);
      };
    
      const handleSaveChanges = () => {
        if (editingRecipe) {
          editRecipe(editingRecipe.id, editingRecipe)
            .then(() => {
              setEditingRecipe(null);
              fetchRecipes();
            })
            .catch((err) => console.log(err));
        }
      };
    
      const handleCancelEdit = () => {
        setEditingRecipe(null);
      };
  
    const handleDeleteRecipe = (id) => {
      if (window.confirm('Are you sure you want to delete this recipe?')) {
        deleteRecipe(id)
          .then(() => fetchRecipes())
          .catch((err) => console.log(err));
      }
    };
  
    useEffect(() => {
      fetchRecipes();
    }, [fetchRecipes]);

    return (
        <div className="row gy-4 gx-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-4">
              <RecipeCard
                name={recipe.title}
                photo={recipe.photo}
                ingredients={recipe.ingredients}
                instructions={recipe.instructions}
              />
              <button onClick={() => handleEditRecipe(recipe.id)}>Edit</button>
              <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
            </div>
          ))}
        </div>
      );
    };

export default MyRecipes;

*/
