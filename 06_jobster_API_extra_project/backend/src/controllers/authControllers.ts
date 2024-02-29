import { RequestHandler } from "express";
import User from "./../models/UserModel";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "./../errors";

//------------------------------------------------------------
const register: RequestHandler = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      token: user.createJWT(),
    },
  });
};

//------------------------------------------------------------
const login: RequestHandler = async (req, res) => {
  console.log(req.body);
  // check credentials !
  if (!req.body.email || !req.body.password) {
    throw new BadRequestError("Please provide: email and password");
  }
  // check user exists !
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new UnauthenticatedError("User unknown 2!");
  }

  // compare password
  const validPassword = await user.comparePassword(req.body.password);
  if (!validPassword) {
    throw new UnauthenticatedError("User unknown 3!");
  }

  //All is OK: user + token
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      token: user.createJWT(),
    },
  });
};

//------------------------------------------------------------
/* Version 1
-------------
const updateUser: RequestHandler = async (req, res) => {
  if (
    !req.body.email ||
    !req.body.name ||
    !req.body.lastName ||
    !req.body.location
  ) {
    throw new BadRequestError(
      "Email, Name, LastName and Location values are all required",
    );
  }

  const user = await User.findByIdAndUpdate(req.user!._id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new NotFoundError(`No User found ${req.user!.name}`);
  }

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token: user.createJWT(),
    },
  });
};
 */
//----

/* Version 2
------------- */
const updateUser: RequestHandler = async (req, res) => {
  if (
    !req.body.email ||
    !req.body.name ||
    !req.body.lastName ||
    !req.body.location
  ) {
    throw new BadRequestError(
      "Email, Name, LastName and Location values are all required",
    );
  }

  const user = await User.findById(req.user!._id);

  if (!user) {
    throw new NotFoundError(`No User found ${req.user!.name}`);
  }

  if (user._id.equals(process.env.TEST_USER_ID)) {
    req.body.email = user.email;
  }

  user.email = req.body.email;
  user.name = req.body.name;
  user.lastName = req.body.lastName;
  user.location = req.body.location;

  await user.save();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token: user.createJWT(),
    },
  });
};

export { register, login, updateUser };
