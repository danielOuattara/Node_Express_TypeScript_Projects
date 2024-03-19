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
/**
 * Create an interface representing a document in MongoDB
 */
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
}
