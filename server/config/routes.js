const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../app/middlewares/aunthentication");
const userController = require("../app/controllers/userController");
const categoryController = require("../app/controllers/categoriesController");
const dishesController = require("../app/controllers/dishesController");
const cartController = require("../app/controllers/cartController");

router.post("/users/register", userController.register);
router.post("/users/login", userController.login);
router.get("/users/account", authenticateUser, userController.account);

router.post("/category", authenticateUser, categoryController.create);
router.get("/category", authenticateUser, categoryController.list);
router.delete("/category/:id", authenticateUser, categoryController.destroy);

router.post("/dishes", authenticateUser, dishesController.create);
router.get("/dishes", authenticateUser, dishesController.list);
router.get("/dishes/:id", authenticateUser, dishesController.show);
router.delete("/dishes/:id", authenticateUser, dishesController.destroy);

router.post("/cart", authenticateUser, cartController.create);
router.get("/cart", authenticateUser, cartController.list);
router.delete("/cart/:id", authenticateUser, cartController.destroy);

module.exports = router;
