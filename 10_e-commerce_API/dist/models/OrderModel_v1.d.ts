/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema } from "mongoose";
import { IOrder } from "../@types/order";
declare const Order_v1: import("mongoose").Model<IOrder, {}, {}, {}, import("mongoose").Document<unknown, {}, IOrder> & IOrder & {
    _id: import("mongoose").Types.ObjectId;
}, Schema<IOrder, import("mongoose").Model<IOrder, any, any, any, import("mongoose").Document<unknown, any, IOrder> & IOrder & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IOrder, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IOrder>> & import("mongoose").FlatRecord<IOrder> & {
    _id: import("mongoose").Types.ObjectId;
}>>;
export default Order_v1;
