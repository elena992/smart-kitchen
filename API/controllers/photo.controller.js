const cloudinary = require("cloudinary").v2;

module.exports.savePhoto = (req, res, next) => {
  let url =
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ywYhsCJYdzU40YRHvCuA0Zkt/user-AVnaXDYnNvnHqV0M2KJPrZnI/img-pzZC8pwIQYH0SrS9J4LIgV3J.png?st=2023-04-23T16%3A12%3A36Z&se=2023-04-23T18%3A12%3A36Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-23T17%3A11%3A44Z&ske=2023-04-24T17%3A11%3A44Z&sks=b&skv=2021-08-06&sig=tjKZQgIPBXA9TyKtdAiShzp7nmUcqb4K3youQjPFSLw%3D";
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
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
