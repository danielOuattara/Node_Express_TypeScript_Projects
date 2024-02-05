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
    var _a;
    const jobs = yield JobModel_1.default.find({ createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }).sort("createdAt");
    res.status(http_status_codes_1.StatusCodes.OK).json({ count: jobs.length, jobs });
});
exports.getAllJobs = getAllJobs;
const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield JobModel_1.default.findOne({
        _id: req.params.jobId,
        createdBy: req.user._id,
    });
    if (!job) {
        throw new errors_1.NotFoundError("Job Not Found");
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(job);
});
exports.getJob = getJob;
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    req.body.createdBy = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const job = yield JobModel_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(job);
});
exports.createJob = createJob;
const patchJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    if (req.body.company === "" || req.body.position === "") {
        throw new errors_1.BadRequestError("Pease, provide Company and Position for update.");
    }
    const job = yield JobModel_1.default.findOneAndUpdate({ _id: req.params.jobId, createdBy: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id }, req.body, { new: true, runValidators: true });
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
