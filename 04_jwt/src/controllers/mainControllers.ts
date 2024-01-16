import { RequestHandler } from "express";

//---------------------------------------------------------------------------
const login: RequestHandler = async (_req, res) => {
  return res.status(200).json({ msg: "Fake Login/register/signup routes" });
};

// ---------------------------------------------------------------------------
const dashboard: RequestHandler = async (_req, res) => {
  return res
    .status(200)
    .json({
      message: "Hello John Doe",
      numberSecret: Math.floor(Math.random() * 101),
    });
};

export { login, dashboard };
