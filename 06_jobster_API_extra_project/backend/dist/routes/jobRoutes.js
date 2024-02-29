"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobControllers_1 = require("./../controllers/jobControllers");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.route("/").get(jobControllers_1.getAllJobs).post(middlewares_1.testUser, jobControllers_1.createJob);
router
    .route("/:jobId")
    .get(jobControllers_1.getJob)
    .delete(middlewares_1.testUser, jobControllers_1.deleteJob)
    .patch(middlewares_1.testUser, jobControllers_1.patchJob);
exports.default = router;
