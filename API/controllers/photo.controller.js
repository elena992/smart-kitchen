const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports.savePhoto = (req, res, next) => {
  let url = req.body.photo;

  const options = {
    folder: "smart-kitchen",
  };

  cloudinary.uploader.upload(url, options, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      let returnResult = result.url;
      res.json({ returnResult });
    }
  });
};
