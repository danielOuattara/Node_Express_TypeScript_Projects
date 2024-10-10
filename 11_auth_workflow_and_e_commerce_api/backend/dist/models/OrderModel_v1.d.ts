import { Schema } from "mongoose";
import { IOrder } from "../@types/order";
declare const Order_v1: import("mongoose").Model<IOrder, {}, {}, {}, import("mongoose").Document<unknown, {}, IOrder> & IOrder & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, Schema<IOrder, import("mongoose").Model<IOrder, any, any, any, import("mongoose").Document<unknown, any, IOrder> & IOrder & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IOrder, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IOrder>> & import("mongoose").FlatRecord<IOrder> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>>;
export default Order_v1;
