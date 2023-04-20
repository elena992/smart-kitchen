import { createHttp } from "./BaseService";
import { recipeSchema } from "../schemas/recipes.schema";

const authenticatedHttp = createHttp(true);
const unauthenticatedHttp = createHttp(false);

export const createRecipe = (recipe) =>
  authenticatedHttp.post("/create-recipe", recipe);

export const listRecipes = () => unauthenticatedHttp.get("/recipes");

export const getRecipesByCurrentUser = (userId) =>
  authenticatedHttp.get(`/my-recipes`);

export const searchRecipes = (ingredients) =>
  authenticatedHttp.post("/recipes/search", { ingredients });
