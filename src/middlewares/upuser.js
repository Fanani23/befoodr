const multer = require("multer");
const storage = require("../configs/cloud");

const upuser = multer({
  storage: storage,
}).fields([
  {
    name: "photo",
    maxCount: 1,
  },
]);

module.exports = upuser;
