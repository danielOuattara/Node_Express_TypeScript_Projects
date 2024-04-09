import { type Types } from "mongoose";

export enum EnumCategory {
  OFFICE = "office",
  KITCHEN = "kitchen",
  BEDROOM = "bedroom",
}

export enum EnumCompany {
  IKEA = "ikea",
  LIDDY = "liddy",
  MARCOS = "marcos",
}

export interface IProduct {
  name: string;
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
  user: Types.ObjectId;
}
