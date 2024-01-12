import express from "express";
import {
  getAllTasks,
  createTask,
  getTask,
  getOneTask,
  patchTask,
  deleteTask,
  deleteOneTask,
} from "./../controllers/tasksControllers";

const router = express.Router();

router.route("/").get(getAllTasks).post(createTask);
router
  .route("/:id")
  .get(getTask)
  .get(getOneTask)
  .patch(patchTask)
  .delete(deleteTask)
  .delete(deleteOneTask);

export default router;
