const pool = require("../configs/db");

const getRecipe = (search, sortby, sort, limit, page) => {
  return pool.query(
    `SELECT id, title, ingredients, image, video, user_id FROM tbl_recipes WHERE title ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${
      (page - 1) * limit
    }`
  );
};

const getRecipeById = (id) => {
  return pool.query(`SELECT * FROM tbl_recipes WHERE id = '${id}'`);
};

const getRecipeByUser = (user_id) => {
  return pool.query(`SELECT * FROM tbl_recipes WHERE user_id = '${user_id}'`);
};

const createRecipe = (data, user_id) => {
  const { title, image, ingredients, video } = data;
  console.log(user_id);
  pool.query(
    `INSERT INTO tbl_recipes (title, image, ingredients, video, user_id) VALUES ('${title}', '${image}', '${ingredients}', '${video}', '${user_id}')`
  );
};

const updateRecipe = (id, data) => {
  const { title, image, ingredients, video } = data;
  pool.query(
    `UPDATE tbl_recipes SET title='${title}', ingredients='${ingredients}', image='${image}', video='${video}' WHERE id = '${id}'`
  );
};

const deleteRecipe = (id) => {
  return pool.query(`DELETE FROM tbl_recipes WHERE id = '${id}'`);
};

module.exports = {
  getRecipe,
  getRecipeById,
  getRecipeByUser,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
