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
  name: String;
  price: Number;
  description: String;
  image: String;
  category: EnumCategory;
  company: EnumCompany;
  colors: string[];
  featured: Boolean;
  freeShipping: Boolean;
  inventory: Number;
  averageRating: Number;
  numberOfReviews: Number;
  user: Types.ObjectId;
}
