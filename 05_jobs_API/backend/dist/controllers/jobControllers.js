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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.createJob = exports.getOneJob = exports.getAllJobs = void 0;
const getAllJobs = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("All jobs");
});
exports.getAllJobs = getAllJobs;
const getOneJob = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(" One job");
});
exports.getOneJob = getOneJob;
const createJob = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("create job");
});
exports.createJob = createJob;
const updateJob = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("update job");
});
exports.updateJob = updateJob;
const deleteJob = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("delete job");
});
exports.deleteJob = deleteJob;
