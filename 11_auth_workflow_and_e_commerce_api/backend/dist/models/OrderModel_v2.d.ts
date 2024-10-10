import { ISingleOrderItem } from "../@types/order";
declare const Order_v1: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    total: number;
    user: import("mongoose").Types.ObjectId;
    status: string;
    tax: number;
    shippingFee: number;
    subtotal: number;
    orderItems: import("mongoose").Types.DocumentArray<ISingleOrderItem>;
    clientSecret: string;
    paymentIntentId?: string | null | undefined;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    total: number;
    user: import("mongoose").Types.ObjectId;
    status: string;
    tax: number;
    shippingFee: number;
    subtotal: number;
    orderItems: import("mongoose").Types.DocumentArray<ISingleOrderItem>;
    clientSecret: string;
    paymentIntentId?: string | null | undefined;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    total: number;
    user: import("mongoose").Types.ObjectId;
    status: string;
    tax: number;
    shippingFee: number;
    subtotal: number;
    orderItems: import("mongoose").Types.DocumentArray<ISingleOrderItem>;
    clientSecret: string;
    paymentIntentId?: string | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>;
export default Order_v1;
