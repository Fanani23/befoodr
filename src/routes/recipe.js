const express = require("express");
const router = express.Router();
const { recipeController } = require("../controllers/recipe");
const upload = require("../middlewares/upload");
const protect = require("../middlewares/jwt-auth");

router.get(`/`, recipeController.get);
router.get(`/byid/:id`, protect, recipeController.getByid);
router.get(`/user`, protect, recipeController.getByUser);
router.post(`/`, protect, upload, recipeController.create);
router.put(`/:id`, protect, upload, recipeController.update);
router.delete(`/:id`, recipeController.delete);

module.exports = router;
