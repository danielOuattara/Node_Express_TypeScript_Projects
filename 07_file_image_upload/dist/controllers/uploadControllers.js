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
const path_1 = __importDefault(require("path"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const uploadProductImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.files);
    if (!req.files) {
        throw new errors_1.BadRequestError("No File Uploaded");
    }
    const productImage = req.files.image;
    if (!productImage.mimetype.startsWith("image")) {
        throw new errors_1.BadRequestError("Only image can be uploaded");
    }
    if (productImage.size > process.env.IMAGE_MAX_SIZE) {
        throw new errors_1.BadRequestError("Image max size is 1Mb");
    }
    const imagePath = path_1.default.join(__dirname, "./../../public/uploads/" + `${productImage.name}`);
    yield productImage.mv(imagePath);
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ image: { src: `/uploads/${productImage.name}` } });
});
exports.uploadProductImage = uploadProductImage;
