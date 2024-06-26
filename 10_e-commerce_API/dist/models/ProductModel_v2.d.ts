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
import { Types } from "mongoose";
import { EnumCategory, EnumCompany } from "../@types/product";
declare const Product_v2: import("mongoose").Model<{
    name: string;
    user: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
    price: number;
    description: string;
    image: string;
    category: EnumCategory;
    company: EnumCompany;
    colors: string[];
    featured: boolean;
    freeShipping: boolean;
    inventory: number;
    averageRating: number;
    numberOfReviews: number;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    name: string;
    user: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
    price: number;
    description: string;
    image: string;
    category: EnumCategory;
    company: EnumCompany;
    colors: string[];
    featured: boolean;
    freeShipping: boolean;
    inventory: number;
    averageRating: number;
    numberOfReviews: number;
}> & {
    name: string;
    user: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
    price: number;
    description: string;
    image: string;
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
}, any>;
export default Product_v2;
