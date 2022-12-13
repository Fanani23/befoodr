const jwt = require("jsonwebtoken");
const { response } = require("../helpers/common");

let key = process.env.JWT_KEY;

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      const auth = req.headers.authorization;
      token = auth.split(" ")[1];
      console.log(token);
      const payload = await jwt.verify(token, key);
      console.log(payload);
      req.payload = payload;
      next();
    } else {
      response(res, 401, false, [], "Server need token");
    }
  } catch (error) {
    console.log(error);
    if (error && error.name === "JsonWebTokenError") {
      res
        .status(401)
        .json({ status: "Error", message: "Access denied, invalid token" });
    } else if (error && error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ status: "Error", message: "Access denied, token expired" });
    } else {
      return res.status(401).json({
        status: "Error",
        message: "Access denied, server token is not active",
      });
    }
  }
};

module.exports = protect;
