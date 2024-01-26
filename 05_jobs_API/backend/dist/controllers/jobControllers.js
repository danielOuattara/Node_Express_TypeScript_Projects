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
exports.deleteJob = exports.patchJob = exports.createJob = exports.getJob = exports.getAllJobs = void 0;
const getAllJobs = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("All jobs");
});
exports.getAllJobs = getAllJobs;
const getJob = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(" One job");
});
exports.getJob = getJob;
const createJob = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("create job");
});
exports.createJob = createJob;
const patchJob = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("update job");
});
exports.patchJob = patchJob;
const deleteJob = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("delete job");
});
exports.deleteJob = deleteJob;
