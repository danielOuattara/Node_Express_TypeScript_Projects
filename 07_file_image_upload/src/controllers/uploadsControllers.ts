/* Image uploaded locally on the application server
----------------------------------------------------- */

// import { RequestHandler } from "express";
// import path from "path";
// import { StatusCodes } from "http-status-codes";
// import { BadRequestError } from "../errors";

// const uploadProductImage: RequestHandler = async (req, res) => {
//   if (!req.files) {
//     throw new BadRequestError("No File Uploaded");
//   }

//   const productImage = req.files.image;

//   if (Array.isArray(productImage)) {
//     /* Handle multiple files here */
//     res
//       .status(StatusCodes.BAD_REQUEST)
//       .send("Please send one image per request");
//   } else {
//     /* Handle single file */
//     if (!productImage.mimetype.startsWith("image")) {
//       throw new BadRequestError("Only image can be uploaded");
//     }
//     if (productImage.size > parseInt(process.env.IMAGE_MAX_SIZE! as string)) {
//       throw new BadRequestError("Image max size is 1Mb");
//     }

//     const imagePath = path.join(
//       __dirname,
//       "./../../public/uploads/" + `${productImage.name}`,
//     );

//     await productImage.mv(imagePath);

//     res
//       .status(StatusCodes.OK)
//       .json({ image: { src: `/uploads/${productImage.name}` } });
//   }
// };

// export { uploadProductImage };

//--------------------------------------------------------------------------

/* Image uploaded on cloud using cloudinary.com
---------------------------------------------- */

import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";

const uploadProductImage: RequestHandler = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;
  if (Array.isArray(productImage)) {
    /* Handle multiple files here */
    res
      .status(StatusCodes.BAD_REQUEST)
      .send("Please send one image per request");
  } else {
    /* Handle single file */
    if (!productImage.mimetype.startsWith("image")) {
      throw new BadRequestError("Only image can be uploaded");
    }

    if (productImage.size > parseInt(process.env.IMAGE_MAX_SIZE! as string)) {
      throw new BadRequestError("Image max size is 1Mb");
    }

    const result = await cloudinary.uploader.upload(productImage.tempFilePath, {
      use_filename: true,
      folder: "file-upload-john-smilga",
    });

    console.log("result = ", result);
    fs.unlinkSync(productImage.tempFilePath);
    res.status(StatusCodes.CREATED).json({ image: { src: result.secure_url } });
  }
};

export { uploadProductImage };
