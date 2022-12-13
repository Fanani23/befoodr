const multer = require("multer");
const storage = require("../configs/cloud");

// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     const uniq = Date.now() + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniq + ".png");
//   },
// });

// const imageUpload = multer({
//   limits: {
//     fileSize: 10 * Math.pow(1024, 2),
//   },
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error("File format must be .png or .jpg"));
//     }
//   },
// });

// const upload = multer({ storage, imageUpload });

const upload = multer({
  storage: storage,
}).fields([
  {
    name: "image",
    maxCount: 1,
  },
  {
    name: "video",
    maxCount: 1,
  },
]);

module.exports = upload;
