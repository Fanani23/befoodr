const recipe = require("../models/recipe");
const cloudinary = require("../configs/cloud");
const { response } = require("../helpers/common");

const recipeController = {
  get: (req, res, next) => {
    const search = req.query.search || "";
    const sortby = req.query.sortby || "title";
    const sort = req.query.sort || "asc";
    const limit = req.query.limit || 6;
    const page = req.query.page || 1;
    recipe
      .getRecipe(search, sortby, sort, limit, page)
      .then((result) => {
        response(res, 200, true, result.rows, "Success get recipe");
      })
      .catch((error) => {
        console.log(error);
        response(res, 400, false, error, "Can't get recipes data");
      });
  },
  getByid: (req, res, next) => {
    recipe
      .getRecipeById(req.params.id)
      .then((result) => {
        response(res, 200, true, result.rows, "Success get recipe by ID");
      })
      .catch((error) => {
        console.log(error);
        response(res, 400, false, error, "Get recipe by ID failed");
      });
  },
  getByUser: async (req, res) => {
    try {
      const user_id = req.payload.id;
      console.log(user_id);
      const result = await recipe.getRecipeByUser(user_id);
      response(res, 200, true, result.rows, "Success get recipe by user");
    } catch (error) {
      response(res, 400, false, error, "Get recipe by user failed");
    }
  },
  create: async (req, res, next) => {
    try {
      const user_id = req.payload.id;
      console.log(user_id);
      const {
        image: [image],
        video: [video],
      } = req.files;
      req.body.image = image.path;
      req.body.video = video.path;
      const result = await recipe.createRecipe(req.body, user_id);
      return response(res, 200, true, result, "Create new recipe success");
    } catch (error) {
      console.log(error);
      return response(res, 400, false, error, "Create new recipe failed");
    }
  },
  update: async (req, res, next) => {
    try {
      const user_id = req.payload.id;
      console.log(user_id);
      const {
        image: [image],
        video: [video],
      } = req.files;
      req.body.image = image.path;
      req.body.video = video.path;
      console.log(req.body);
      const result = await recipe.updateRecipe(req.params.id, req.body);
      return response(res, 200, true, result, "Update recipe success");
    } catch (error) {
      console.log(error);
      return response(res, 400, false, error, "Update recipe failed");
    }
  },
  delete: (req, res, next) => {
    recipe
      .deleteRecipe(req.params.id)
      .then((result) => {
        response(res, 200, true, result.rows, "Delete recipe success");
      })
      .catch((error) => {
        console.log(error);
        response(res, 400, false, error, "Delete recipe failed");
      });
  },
};

exports.recipeController = recipeController;
