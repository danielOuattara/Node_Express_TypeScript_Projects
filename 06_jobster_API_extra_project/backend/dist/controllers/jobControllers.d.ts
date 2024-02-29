import { RequestHandler } from "express";
declare const getAllJobs: RequestHandler;
declare const getJob: RequestHandler;
declare const createJob: RequestHandler;
declare const patchJob: RequestHandler;
declare const deleteJob: RequestHandler;
declare const showStats: RequestHandler;
export { getAllJobs, getJob, createJob, patchJob, deleteJob, showStats };
