import { RequestHandler } from "express";
import { ICreateProductReqBody } from "../@types/product";
export declare const createProduct: RequestHandler<{}, {}, ICreateProductReqBody>;
export declare const getAllProducts: RequestHandler;
export declare const getSingleProduct: RequestHandler;
export declare const updateProduct: RequestHandler;
export declare const deleteProduct: RequestHandler;
export declare const uploadImage: RequestHandler;
