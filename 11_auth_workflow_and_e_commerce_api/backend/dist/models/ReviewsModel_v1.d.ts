import { Model, Types } from "mongoose";
import { IReview } from "../@types/reviews";
interface IReviewModel extends Model<IReview> {
    calculateAverageRating(id: Types.ObjectId): Promise<void>;
}
declare const Model_v1: IReviewModel;
export default Model_v1;
