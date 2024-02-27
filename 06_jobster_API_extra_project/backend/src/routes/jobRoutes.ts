import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  patchJob,
} from "./../controllers/jobControllers";

const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:jobId").get(getJob).delete(deleteJob).patch(patchJob);

export default router;
