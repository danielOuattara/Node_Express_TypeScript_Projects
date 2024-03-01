import { RequestHandler } from "express";
import path from "path";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";

const uploadProductImage: RequestHandler = async (req, res) => {
  console.log(req.files);

  if (!req.files) {
    throw new BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;

  const imagePath = path.join(
    __dirname,
    "./../../public/uploads/" + `${productImage.name}`,
  );

  await productImage.mv(imagePath);

  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

export { uploadProductImage };
