import express from "express";
import {
  getAllTasks,
  createTask,
  getTask,
  getOneTask,
  updateTask,
  updateOneTask,
  patchTask,
  patchOneTask,
  deleteTask,
  deleteOneTask,
} from "./../controllers/tasksControllers";

const router = express.Router();

router.route("/").get(getAllTasks).post(createTask);
router
  .route("/:id")
  .get(getTask)
  //   .get(getOneTask)
  .put(updateTask)
  //   .put(updateOneTask)
  .patch(patchTask)
  //   .patch(patchOneTask)
  .delete(deleteTask);
//   .delete(deleteOneTask);

export default router;
