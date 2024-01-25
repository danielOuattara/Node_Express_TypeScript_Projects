import { RequestHandler } from "express";


//------------------------------------------------------------
const register: RequestHandler = async (_req, res) => {
	res.send("register user")
}

//------------------------------------------------------------
const login: RequestHandler = async (_req, res) => {
	res.send("login user")
}


export { register, login}