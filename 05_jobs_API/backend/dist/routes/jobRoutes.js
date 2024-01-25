"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobControllers_1 = require("./../controllers/jobControllers");
const router = express_1.default.Router();
router.route("/").get(jobControllers_1.getAllJobs).post(jobControllers_1.createJob);
router.route("/:jobId").get(jobControllers_1.getOneJob).delete(jobControllers_1.deleteJob).patch(jobControllers_1.patchJob);
exports.default = router;
