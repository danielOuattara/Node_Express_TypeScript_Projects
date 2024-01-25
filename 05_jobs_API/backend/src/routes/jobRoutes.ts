import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getOneJob,
  patchJob,
} from "./../controllers/jobControllers";

const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:jobId").get(getOneJob).delete(deleteJob).patch(patchJob);

export default router;
