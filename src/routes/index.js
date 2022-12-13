const express = require("express");
const router = express.Router();
const user = require("./user");
const recipe = require("./recipe");

router.use(`/users`, user);
router.use(`/recipe`, recipe);

module.exports = router;
