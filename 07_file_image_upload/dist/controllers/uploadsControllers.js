"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProductImage = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const cloudinary_1 = require("cloudinary");
const node_fs_1 = __importDefault(require("node:fs"));
const uploadProductImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        throw new errors_1.BadRequestError("No File Uploaded");
    }
    const productImage = req.files.image;
    if (Array.isArray(productImage)) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .send("Please send one image per request");
    }
    else {
        if (!productImage.mimetype.startsWith("image")) {
            throw new errors_1.BadRequestError("Only image can be uploaded");
        }
        if (productImage.size > parseInt(process.env.IMAGE_MAX_SIZE)) {
            throw new errors_1.BadRequestError("Image max size is 1Mb");
        }
        const result = yield cloudinary_1.v2.uploader.upload(productImage.tempFilePath, {
            use_filename: true,
            folder: "file-upload-john-smilga",
        });
        console.log("result = ", result);
        node_fs_1.default.unlinkSync(productImage.tempFilePath);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ image: { src: result.secure_url } });
    }
});
exports.uploadProductImage = uploadProductImage;
