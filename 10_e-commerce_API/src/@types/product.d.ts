import { Types } from "mongoose";

// declare enum EnumCategory {}
// declare enum EnumCompany {}

declare enum EnumCategory {
  OFFICE = "office",
  KITCHEN = "kitchen",
  BEDROOM = "bedroom",
}

declare enum EnumCompany {
  IKEA = "ikea",
  LIDDY = "liddy",
  MARCOS = "marcos",
}

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
  numberOfReviews: Number;
  user: Types.ObjectId;
}

interface ICreateProductReqBody {
  user: Types.ObjectId;
}
