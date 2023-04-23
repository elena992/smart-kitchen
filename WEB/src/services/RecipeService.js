import { createHttp } from "./BaseService";
import { recipeSchema } from "../schemas/recipes.schema";

const authenticatedHttp = createHttp(true);
const unauthenticatedHttp = createHttp(false);

export const createRecipe = (recipe) =>
  authenticatedHttp.post("/create-recipe", recipe);

export const listRecipes = () => unauthenticatedHttp.get("/recipes");

export const getRecipesByCurrentUser = () =>
  authenticatedHttp.get(`/my-recipes`);

export const searchRecipes = (ingredients) =>
  authenticatedHttp.post("/recipes/search", { ingredients });

export const getRecipeById = (id) =>
  authenticatedHttp.get(`/detail-recipe/${id}`);

export const getImageFromPrompt = (prompt) =>
  authenticatedHttp.post("/recipes/search-image", { prompt });

 /*export const updateRecipe = (id, recipe) =>
  authenticatedHttp.patch(`/detail-recipes/${id}`, recipe); */

  export const deleteRecipes = (id) => authenticatedHttp.delete(`/recipes/delete/${id}`);

  export const saveImage = (photoUrl) =>
  authenticatedHttp.post("/recipes/save-image", { photoUrl });