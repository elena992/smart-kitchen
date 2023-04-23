const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports.savePhoto = (req, res, next) => {
  console.log("SAVE PHOTO");
  console.log(req.body);
  let url = req.body;

  const options = {
    folder: "smart-kitchen",
    public_id: "my_image_id",
  };

  cloudinary.uploader.upload(url, options, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log(result);
    }
  });
};
