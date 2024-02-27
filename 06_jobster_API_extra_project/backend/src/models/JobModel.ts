// ---> Separate document interface definition
// import { Schema, Types, model } from "mongoose";

// enum EnumStatus {
//   INTERVIEW = "interview",
//   DECLINED = "declined",
//   PENDING = "pending",
// }

// interface IJob {
//   company: string;
//   position: string;
//   status: EnumStatus;
//   createdBy: Types.ObjectId;
// }

// const schema = new Schema<IJob>(
//   {
//     company: {
//       type: String,
//       required: [true, "Company name is required !"],
//       maxLength: 50,
//       trim: true,
//     },

//     position: {
//       type: String,
//       required: [true, "Position title is required !"],
//       maxLength: 100,
//       trim: true,
//     },

//     status: {
//       type: String,
//       enum: Object.values(EnumStatus),
//       default: EnumStatus.PENDING,
//     },

//     createdBy: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: [true, "Job creator name is required !"],
//     },
//   },
//   { timestamps: true },
// );

// export default model<IJob>("Job", schema);

//==============================================================================

// ---> Automatic type inference
import { ObjectId } from "mongodb";
import { Schema, model, InferSchemaType } from "mongoose";

const schema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required !"],
      maxLength: 50,
      trim: true,
    },

    position: {
      type: String,
      required: [true, "Position title is required !"],
      maxLength: 100,
      trim: true,
    },

    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },

    createdBy: {
      type: ObjectId,
      ref: "User",
      required: [true, "Job creator name is required !"],
    },
  },
  { timestamps: true },
);

type TJob = InferSchemaType<typeof schema>;

export default model<TJob>("Job", schema);
