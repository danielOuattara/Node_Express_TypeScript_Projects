import { Types } from "mongoose";
import { EnumCategory, EnumCompany } from "../@types/product";
declare const Product_v2: import("mongoose").Model<{
    image: string;
    name: string;
    description: string;
    user: {
        prototype?: Types.ObjectId | null | undefined;
        isValid?: {} | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
    };
    price: number;
    category: EnumCategory;
    company: EnumCompany;
    colors: string[];
    featured: boolean;
    freeShipping: boolean;
    inventory: number;
    averageRating: number;
    numberOfReviews: number;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    image: string;
    name: string;
    description: string;
    user: {
        prototype?: Types.ObjectId | null | undefined;
        isValid?: {} | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
    };
    price: number;
    category: EnumCategory;
    company: EnumCompany;
    colors: string[];
    featured: boolean;
    freeShipping: boolean;
    inventory: number;
    averageRating: number;
    numberOfReviews: number;
}> & {
    image: string;
    name: string;
    description: string;
    user: {
        prototype?: Types.ObjectId | null | undefined;
        isValid?: {} | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
    };
    price: number;
    category: EnumCategory;
    company: EnumCompany;
    colors: string[];
    featured: boolean;
    freeShipping: boolean;
    inventory: number;
    averageRating: number;
    numberOfReviews: number;
} & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}, any>;
export default Product_v2;
