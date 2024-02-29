import { RequestHandler } from "express";
import Job from "../models/JobModel";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";

//----------------------------------------------------------------

interface IQueryParams {
  search?: string;
  status?: string;
  jobType?: string;
  sort?: string;
}

interface IQueryObject {
  [key: string]:
    | string
    | number
    | boolean
    | RegExp
    | { $regex: string; $options: string };
}

const getAllJobs: RequestHandler = async (req, res) => {
  //

  const { search, status, jobType, sort } = req.query as IQueryParams;

  // default queryObject
  const queryObject: IQueryObject = {
    createdBy: req.user!._id.toString(),
  };

  // updated queryObject according to possible queries
  if (search) {
    queryObject.position = { $regex: search as string, $options: "i" };
  }

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  // sort jobs
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

  // setup pagination
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  const jobs = await Job.find(queryObject)
    .sort(sortItem)
    .limit(limit)
    .skip(skip);

  res.status(StatusCodes.OK).json({
    jobs,
    totalJobs,
    numOfPages,
  });
};

//------------------------------------------------------------
const getJob: RequestHandler = async (req, res) => {
  const job = await Job.findOne({
    _id: req.params.jobId,
    createdBy: req.user!._id,
  });
  if (!job) {
    throw new NotFoundError(`No Job Found with id ${req.params.jobId}`);
  }

  res.status(StatusCodes.OK).json(job);
};

//------------------------------------------------------------
const createJob: RequestHandler = async (req, res) => {
  req.body.createdBy = req.user!._id;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

//------------------------------------------------------------
const patchJob: RequestHandler = async (req, res) => {
  if (req.body.company === "" || req.body.position === "") {
    throw new BadRequestError(
      "Pease, provide Company and Position for update.",
    );
  }

  const job = await Job.findOneAndUpdate(
    { _id: req.params.jobId, createdBy: req.user!._id },
    req.body,
    { new: true, runValidators: true },
  );
  if (!job) {
    throw new NotFoundError(
      `No job found with for ${req.user!.name} with id ${req.params.jobId}`,
    );
  }
  res.status(StatusCodes.OK).send({ job });
};

//------------------------------------------------------------
const deleteJob: RequestHandler = async (req, res) => {
  const job = await Job.findOneAndDelete({
    _id: req.params.jobId,
    createdBy: req.user!._id,
  });
  if (!job) {
    throw new NotFoundError(
      `No job found with for ${req.user!.name} with id ${req.params.jobId}`,
    );
  }
  res.status(StatusCodes.OK).json({ msg: "job deleted ! " });
};

export { getAllJobs, getJob, createJob, patchJob, deleteJob };
