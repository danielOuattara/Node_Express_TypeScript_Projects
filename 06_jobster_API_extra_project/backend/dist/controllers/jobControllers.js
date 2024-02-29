"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.patchJob = exports.createJob = exports.getJob = exports.getAllJobs = void 0;
const JobModel_1 = __importDefault(require("../models/JobModel"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, status, jobType, sort } = req.query;
    const queryObject = {
        createdBy: req.user.id,
    };
    if (search) {
        queryObject.position = { $regex: search, $options: "i" };
    }
    if (status && status !== "all") {
        queryObject.status = status;
    }
    if (jobType && jobType !== "all") {
        queryObject.jobType = jobType;
    }
    let sortItem = null;
    if (sort === "latest") {
        sortItem = "-createdAt";
    }
    if (sort === "oldest") {
        sortItem = "createdAt";
    }
    if (sort === "a-z") {
        sortItem = "position";
    }
    if (sort === "z-a") {
        sortItem = "-position";
    }
    console.log("queryObject = ", queryObject);
    const jobs = yield JobModel_1.default.find(queryObject).sort(sortItem);
    res.status(http_status_codes_1.StatusCodes.OK).json({ count: jobs.length, jobs });
});
exports.getAllJobs = getAllJobs;
const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield JobModel_1.default.findOne({
        _id: req.params.jobId,
        createdBy: req.user._id,
    });
    if (!job) {
        throw new errors_1.NotFoundError(`No Job Found with id ${req.params.jobId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(job);
});
exports.getJob = getJob;
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.createdBy = req.user._id;
    const job = yield JobModel_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(job);
});
exports.createJob = createJob;
const patchJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.company === "" || req.body.position === "") {
        throw new errors_1.BadRequestError("Pease, provide Company and Position for update.");
    }
    const job = yield JobModel_1.default.findOneAndUpdate({ _id: req.params.jobId, createdBy: req.user._id }, req.body, { new: true, runValidators: true });
    if (!job) {
        throw new errors_1.NotFoundError(`No job found with for ${req.user.name} with id ${req.params.jobId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).send({ job });
});
exports.patchJob = patchJob;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield JobModel_1.default.findOneAndDelete({
        _id: req.params.jobId,
        createdBy: req.user._id,
    });
    if (!job) {
        throw new errors_1.NotFoundError(`No job found with for ${req.user.name} with id ${req.params.jobId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "job deleted ! " });
});
exports.deleteJob = deleteJob;
