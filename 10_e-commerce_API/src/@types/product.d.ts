import { Types } from "mongoose";

declare enum EnumCategory {}
declare enum EnumCompany {}

interface IProduct {
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
  user: Types.ObjectId;
}

interface ICreateProductReqBody {
  user: Types.ObjectId;
}
