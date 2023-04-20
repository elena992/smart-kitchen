import { createHttp } from "./BaseService";
import { recipeSchema } from "../schemas/recipes.schema";

const authenticatedHttp = createHttp(true);
const unauthenticatedHttp = createHttp(false);

export const createRecipe = (recipe) =>
  authenticatedHttp.post("/recipes", recipe);

export const listRecipes = () => unauthenticatedHttp.get("/recipes");

export const getRecipesByUser = (id) => authenticatedHttp.patch(`/recipes/${id}`);

export const searchRecipes = (ingredients) =>
  authenticatedHttp.post("/recipes/search", { ingredients });
