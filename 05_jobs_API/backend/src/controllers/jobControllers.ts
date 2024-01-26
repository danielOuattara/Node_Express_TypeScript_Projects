import { RequestHandler } from "express";

//------------------------------------------------------------
const getAllJobs: RequestHandler = async (_req, res) => {
  res.send("All jobs");
};

//------------------------------------------------------------
const getJob: RequestHandler = async (_req, res) => {
  res.send(" One job");
};

//------------------------------------------------------------
const createJob: RequestHandler = async (_req, res) => {
  res.send("create job");
};

//------------------------------------------------------------
const patchJob: RequestHandler = async (_req, res) => {
  res.send("update job");
};

//------------------------------------------------------------
const deleteJob: RequestHandler = async (_req, res) => {
  res.send("delete job");
};

export { getAllJobs, getJob, createJob, patchJob, deleteJob };
