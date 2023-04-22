const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/user.controller");
const recipesController = require("../controllers/recipes.controller");
const upload = require("./storage.config");

const authMiddleware = require("../middlewares/auth.middleware");

//router.get("/", (req, res, next) => res.render("home"));

/* Auth */

router.post("/login", authController.login);

/* Users */
router.post("/signup", usersController.create);
router.get("/users", usersController.list);
router.get(
  "/users/me",
  authMiddleware.isAuthenticated,
  usersController.getCurrentUser
);
router.get("/users/:id", usersController.getUser);
//router.get('/users/:id/edit', authMiddleware.isAuthenticated, usersController.editUser);

/* Recipes */

router.post(
  "/create-recipe",
  authMiddleware.isAuthenticated,
  upload.single("photo"),
  recipesController.create
);
router.get("/recipes", recipesController.list);
router.get(
  "/my-recipes",
  authMiddleware.isAuthenticated,
  recipesController.getRecipesByCurrentUser
);

router.get(
  "/detail-recipe/:id",
  authMiddleware.isAuthenticated,
  recipesController.getRecipeById
);

router.post(
  "/recipes/search",
  authMiddleware.isAuthenticated,
  recipesController.searchRecipes
);

router.post(
  "/recipes/search-image",
  authMiddleware.isAuthenticated,
  recipesController.getImageFromPrompt
);

router.delete('/recipes/delete/:id', authMiddleware.isAuthenticated, recipesController.deleteRecipes)

/*router.patch("/recipes/:id", authMiddleware.isAuthenticated, upload.single("photo"), recipesController.updateRecipe); */

module.exports = router;
