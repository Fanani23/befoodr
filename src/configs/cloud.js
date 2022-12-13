const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.PHOTO_NAME,
  api_key: process.env.PHOTO_KEY,
  api_secret: process.env.PHOTO_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "foodrec",
    resource_type: "auto",
    allowedFormats: ["jpeg", "png", "jpg", "mp4", "mkv"],
  },
});

module.exports = cloudinary;
module.exports = storage;
