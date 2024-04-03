import { RequestHandler } from "express";
import { IProduct } from "../@types/product";
export declare const createProduct: RequestHandler<{}, {}, IProduct>;
export declare const getAllProducts: RequestHandler;
export declare const getSingleProduct: RequestHandler;
export declare const patchProduct: RequestHandler;
export declare const deleteProduct: RequestHandler;
export declare const uploadImage: RequestHandler;
