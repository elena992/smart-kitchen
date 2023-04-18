import { createHttp } from "./BaseService";
import { recipeSchema } from "../schemas/recipes.schema";

const authenticatedHttp = createHttp(true);
const unauthenticatedHttp = createHttp(false);

export const createRecipe = (recipe) => authenticatedHttp.post("/recipes", recipe);

export const listRecipes = () => unauthenticatedHttp.get("/recipes");

export const myRecipes = (id) => authenticatedHttp.get(`/recipes/${id}`);

export const deleteRecipe = (id) => authenticatedHttp.delete(`/recipes/${id}/delete`);

export const editRecipe = (id, recipe) => authenticatedHttp.patch(`/recipes/${id}/edit`, recipe);

export const searchRecipes = (ingredients) => authenticatedHttp.post("/recipes/search", ingredients);
