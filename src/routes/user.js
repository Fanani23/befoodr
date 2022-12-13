const express = require("express");
const router = express.Router();
const { user } = require("../controllers/user");
const protect = require("../middlewares/jwt-auth");
const upuser = require("../middlewares/upuser");

router.post(`/register`, user.register);
router.post(`/login`, user.login);
router.post(`/verification`, user.otp);
router.put(`/:id`, protect, upuser, user.update);
router.get(`/`, protect, user.get);

module.exports = router;
