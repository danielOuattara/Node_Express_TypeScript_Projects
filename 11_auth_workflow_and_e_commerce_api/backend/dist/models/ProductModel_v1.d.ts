import { Model } from "mongoose";
import { IProduct } from "../@types/product";
declare const Product_v1: Model<IProduct, {}, {}, {}, import("mongoose").Document<unknown, {}, IProduct> & IProduct & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>;
export default Product_v1;
