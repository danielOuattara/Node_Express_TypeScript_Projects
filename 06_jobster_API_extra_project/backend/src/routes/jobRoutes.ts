import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  patchJob,
} from "./../controllers/jobControllers";
import { testUser } from "../middlewares";

const router = express.Router();

router.route("/").get(getAllJobs).post(testUser, createJob);
router
  .route("/:jobId")
  .get(getJob)
  .delete(testUser, deleteJob)
  .patch(testUser, patchJob);

export default router;
