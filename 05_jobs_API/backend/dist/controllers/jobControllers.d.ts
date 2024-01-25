import { RequestHandler } from "express";
declare const getAllJobs: RequestHandler;
declare const getOneJob: RequestHandler;
declare const createJob: RequestHandler;
declare const patchJob: RequestHandler;
declare const deleteJob: RequestHandler;
export { getAllJobs, getOneJob, createJob, patchJob, deleteJob };
