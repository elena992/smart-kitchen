const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const CloudinaryStorage =
  require("multer-storage-cloudinary").CloudinaryStorage;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "smart-kitchen",
    allowedFormats: ["jpg", "png"],
  },
});

function uploadSingleImage(imageUrl) {
  return new Promise((resolve, reject) => {
    console.log(imageUrl);
    cloudinary.uploader.upload(imageUrl, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.url);
      }
    });
  });
}

module.exports = multer({ storage: storage });
module.exports = uploadSingleImage;
