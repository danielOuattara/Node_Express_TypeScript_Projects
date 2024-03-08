import { RequestHandler } from "express";

//-----------------------------------------------------

const register: RequestHandler = (_req, res) => {
  res.send("register user");
};

//-----------------------------------------------------

const login: RequestHandler = (_req, res) => {
  res.send("login user");
};

//-----------------------------------------------------

const logout: RequestHandler = (_req, res) => {
  res.send("logout user");
};

export { register, login, logout };
