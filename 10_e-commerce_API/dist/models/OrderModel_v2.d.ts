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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ISingleOrderItem } from "../@types/order";
declare const Order_v1: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    tax: number;
    shippingFee: number;
    subtotal: number;
    total: number;
    orderItems: import("mongoose").Types.DocumentArray<ISingleOrderItem>;
    status: string;
    user: import("mongoose").Types.ObjectId;
    clientSecret: string;
    paymentIntentId?: string | null | undefined;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    tax: number;
    shippingFee: number;
    subtotal: number;
    total: number;
    orderItems: import("mongoose").Types.DocumentArray<ISingleOrderItem>;
    status: string;
    user: import("mongoose").Types.ObjectId;
    clientSecret: string;
    paymentIntentId?: string | null | undefined;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    tax: number;
    shippingFee: number;
    subtotal: number;
    total: number;
    orderItems: import("mongoose").Types.DocumentArray<ISingleOrderItem>;
    status: string;
    user: import("mongoose").Types.ObjectId;
    clientSecret: string;
    paymentIntentId?: string | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
export default Order_v1;
