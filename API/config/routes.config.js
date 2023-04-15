const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/user.controller");
const recipesController = require("../controllers/recipes.controller");
const upload = require('./storage.config');


const authMiddleware = require("../middlewares/auth.middleware");

//router.get("/", (req, res, next) => res.render("home"));

/* Auth */

router.post("/login", authController.login);

/* Users */
router.post('/signup', usersController.create);
router.get('/users', usersController.list);
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get('/users/:id', usersController.getUser);
//router.get('/users/:id/edit', authMiddleware.isAuthenticated, usersController.editUser);

/* Recipes */

router.post('/recipes', authMiddleware.isAuthenticated, upload.single('photo'), recipesController.create);
router.get('/recipes', recipesController.list);
router.patch('/recipes/:id', authMiddleware.isAuthenticated, recipesController.created);

module.exports = router;
