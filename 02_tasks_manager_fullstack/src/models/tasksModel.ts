// //Separate document interface definition

// import { Schema, model } from "mongoose";

// interface TaskInterface {
//   name: string;
//   completed: Boolean;
// }

// const TaskSchema = new Schema<TaskInterface>(
//   {
//     name: {
//       type: String,
//       required: [true, "Cannot be empty"],
//       trim: true,
//       maxlength: [50, "Max length 50 chars"],
//     },
//     completed: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true },
// );

// const Task = model<TaskInterface>("Task", TaskSchema);
// export default Task;

//----------------------------------------------------------------------- OR
// Automatic type inference

import { Schema, model, InferSchemaType } from "mongoose";

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Cannot be empty"],
      trim: true,
      maxlength: [50, "Max length 50 chars"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, updatedAt: false },
);

type T_Task = InferSchemaType<typeof TaskSchema>;

const Task = model<T_Task>("Task", TaskSchema);
export default Task;
