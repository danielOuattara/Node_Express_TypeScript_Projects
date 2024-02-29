import { RequestHandler } from "express";
import Job from "../models/JobModel";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import moment from "moment";

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

//-------------------------------------------------------------

type TAggregateStats = {
  _id: string;
  count: number;
};

type TStats = {
  [key: string]: number; // Define an index signature for string keys with number values
  declined: number;
  pending: number;
  interview: number;
};

type TAggregateMonthly = {
  _id: { year: number; month: number };
  count: number;
};

type TMonthlyApplications = {
  date: string;
  count: number;
};
const showStats: RequestHandler = async (req, res) => {
  //-------
  const aggregateStats: TAggregateStats[] = await Job.aggregate([
    { $match: { createdBy: req.user!._id } },
    { $group: { _id: "$status", count: { $sum: +1 } } },
  ]);

  const stats: TStats = aggregateStats.reduce((total, current) => {
    total[current._id] = current.count;
    return total;
  }, {} as TStats);

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  //---------

  const aggregateMonthlyApplications: TAggregateMonthly[] = await Job.aggregate(
    [
      { $match: { createdBy: req.user!._id } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: +1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      // { $limit: 12 },
    ],
  );

  const monthlyApplications: TMonthlyApplications[] =
    aggregateMonthlyApplications.map((item) => {
      const date = moment()
        .month(item._id.month - 1)
        .year(item._id.year)
        .format("MMM Y");
      return { date, count: item.count };
    });

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { getAllJobs, getJob, createJob, patchJob, deleteJob, showStats };
