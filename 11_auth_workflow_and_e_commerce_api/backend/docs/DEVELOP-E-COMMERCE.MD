# Project Develop

## Intro

This project is about building the backend API + documentation for a full stack e-commerce platform. In this project will handle authentication, CRUD on user, on product, on reviews, on order, etc...
The work is done using Typescript. The database used is MongoDB, through Mongoose.

## Inpsired BY: John Smilga

The `javascript` version of this project is inspired from the Node.js + Express courses  & projects by John Smilga on Udemy. I convert all John's project from `javascript` to `typescript`. This one is the 8th project. John is a great teacher. Visit [coding addict](https://www.codingaddict.io/courses/) to get more projects

## Start up

- Create a root folder that will hold all the project
- Create `src/` folder. All `*.ts`  input files are located in `src/` folder
- Create `dist/` folder. All `*.js`  output files are located in `dist/` folder
- run `npm run init` to initialize a npm project
- install the following packages as a dependencies:
  `bcryptjs cookie-parser cors dotenv express express-async-errors express-fileupload express-mongo-sanitize express-rate-limit helmet http-status-codes joi jsonwebtoken mongoose morgan validator xss-clean`
- if necessary (when not included dy default in the base package) install for each dependencies installed its equivalent `@types/name` package as as devDependencies:  `@types/bcryptjs @types/cookie-parser @types/cors @types/express @types/express-fileupload @types/jsonwebtoken @types/morgan @types/validator nodemon ts-node typescript`
- run `npx tsc init` to initialize a typescript project. The ouptput of this cmd is the `tsconfig.json` file
- copy the content of my `tscongif.json` in yours, and update or improve to your needs if necessary
- copy or update the content of my `package.jon` to yours
- create a `.env` file lke the `.env.txt` I provided, and fill in with your credentials
- if every went well open 2 console windows base on your root project. In the 1st run `npm run build`. In the 2nd run `npm run dev`.
- `nodemon` helps handle automatic server restart on any modification
  
### Setup Basic Express Server

### Connect To DB

### schema.pre("save, ...")

```typescript
  schema.pre("save", async function () {
    // console.log(this.modifiedPaths()); // --> an array of strings like: [ "name", email]
    // console.log(this.isModified("name")); //  --> boolean
    if (this.isModified("password")) {
      const salt = await genSalt(11);
      this.password = await hash(this.password, salt);
    } else {
      return;
    }
  });
```

### Utilities functions jwt & cookies: legacy

### attacheCookiesToResponse (in UserModel)

One possibility (not used): where the methods `attachCookiesToResponse()` in UserModel directly sends back the response to the client  

```typescript
  export const register: RequestHandler<{}, {}, IUserRegisterReqBody> = async (
    req,
    res,
  ) => {
    const role = (await User.countDocuments({})) === 0 ? ROLE.admin : ROLE.user;
    const user = await User.create({ ...req.body, role });
    user.attachCookiesToResponse(res);
    // res.status(StatusCodes.CREATED).json({ user });
  };
```

```typescript
schema.methods.attachCookiesToResponse = function (res: Response) {
  const payload: IPayload = {
    name: this.name,
    userId: this._id,
    role: this.role,
  };

  const token = this.createJWT(payload);

  res.cookie("access_token", "Bearer " + token, {
    expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
  return res.status(StatusCodes.CREATED).json({ user: payload });
};
```

### More available code logic for userControllers

```ts
/**
 * find({filter}).select(projection)
 */
export const getAllUsers: RequestHandler = async (_req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  return res.status(StatusCodes.OK).json({ nb_Hits: users.length, users });
};
```

OR

```ts
/**
 * find({filter}, projection)
 */
export const getAllUsers: RequestHandler = async (_req, res) => {
  const users = await User.find({ role: "user" }, "-password");
  return res.status(StatusCodes.OK).json({ nb_Hits: users.length, users });
};
```

```ts
/**
 * John's method + cleaned up
 */

export const getSingleUser: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Access denied");
  }

  checkAuthOrAdmin(req.user, req.params.userId);

  const user = await User.findOne({ _id: req.params.userId }).select(
    "-password",
  );
  if (!user) {
    throw new NotFoundError("User Not Found");
  }

  res.status(StatusCodes.OK).json({ user });
};
```

```ts
/**
 * my method: Working!
 */

export const getSingleUser: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Access denied 1");
  }

  if (
    req.user._id.toString() !== req.params.userId ||
    req.user.role !== "admin"
  ) {
    throw new UnauthenticatedError("Access denied 2");
  }
  const user = await User.findOne({ _id: req.params.userId }).select(
    "-password",
  );
  if (!user) {
    throw new NotFoundError("User Not Found");
  }

  res.status(StatusCodes.OK).json({ user });
};
```

```ts
import { Types } from "mongoose";
import { MongooseUser } from "../@types/user";
import { UnauthenticatedError } from "../errors";

export const checkAuthOrAdmin = (
  requestUser: MongooseUser,
  resourceUserId: Types.ObjectId,
) => {
  if (requestUser!.role === "admin") return;
  if (requestUser!._id.equals(resourceUserId)) return;
  throw new UnauthenticatedError("Access denied");
};
```

```ts
/**
 * John's method + cleaned up
 */
export const getSingleUser: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Access denied");
  }

  checkAuthOrAdmin(req.user, new Types.ObjectId(req.params.userId));

  const user = await User.findOne({ _id: req.params.userId }).select(
    "-password",
  );
  if (!user) {
    throw new NotFoundError("User Not Found");
  }

  res.status(StatusCodes.OK).json({ user });
};
```

```ts
/**
 * my method: Working!
 */

export const getSingleUser: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Access denied 1");
  }

  if (
    req.user._id.toString() !== req.params.userId ||
    req.user.role !== "admin"
  ) {
    throw new UnauthenticatedError("Access denied 2");
  }
  const user = await User.findOne({ _id: req.params.userId }).select(
    "-password",
  );
  if (!user) {
    throw new NotFoundError("User Not Found");
  }

  res.status(StatusCodes.OK).json({ user });
};
```

```ts
/**
 * findOneAndUpdate() method 1
 */

export const updateUser: RequestHandler<{}, {}, IUserUpdateReqBody> = async (
  req,
  res,
) => {
  if (!req.body.name || !req.body.email) {
    throw new BadRequestError("Name and Email are required !");
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user!._id },
    { name: req.body.name, email: req.body.email },
    { new: true, runValidators: true },
  );

  if (!user) {
    throw new UnauthenticatedError("User unknown");
  }

  user.attachCookiesToResponse(res);
  res.status(StatusCodes.OK).json({ message: "User updated successfully" });
};
```

```ts
/*
 * user.save() method 2
 */

export const updateUser: RequestHandler<{}, {}, IUserUpdateReqBody> = async (
  req,
  res,
) => {
  if (!req.body.name || !req.body.email) {
    throw new BadRequestError("Name and Email are required !");
  }
  const user = await User.findById(req.user!._id);
  if (!user) {
    throw new UnauthenticatedError("User unknown");
  }

  user.name = req.body.name;
  user.email = req.body.email;

  await user.save();
  user.attachCookiesToResponse(res);
  res.status(StatusCodes.OK).json({ message: "User updated successfully" });
};
```

```ts
/*
 * user.updateOne() method 3
 */

export const updateUser: RequestHandler<{}, {}, IUserUpdateReqBody> = async (
  req,
  res,
) => {
  if (!req.body.name || !req.body.email) {
    throw new BadRequestError("Name and Email are required !");
  }
  const user = await User.findById(req.user!._id);
  if (!user) {
    throw new UnauthenticatedError("User unknown");
  }

  await user.updateOne(req.body, { new: true, runValidators: true });

  // this function attaches cookies to res
  user.attachCookiesToResponse(res);
  res.status(StatusCodes.OK).json({ message: "User updated successfully" });
};
```

```ts
/*
* getAllReviews: no generic definition in the populate() method 
* OK 
*/
 export const getAllReviews: RequestHandler = async (_req, res) => {
   const reviews = await Review.find({})
     .populate({
       path: "product",
       select: "name company category image price description",
     })
     .populate({
       path: "user",
       select: "_id name",
     });
   res.status(StatusCodes.OK).json({ count: reviews.length, reviews });
 };
```

```ts
/*
getAllReviews: generic definition present in the populate() method 
*/
export const getAllReviews: RequestHandler = async (_req, res) => {
  const reviews = await Review.find({})
    .populate<{ product: IProduct }>({
      path: "product",
      select: "name company category image price description",
    })
    .populate<{ user: IUser }>({
      path: "user",
      select: "_id name",
    });
  res.status(StatusCodes.OK).json({ count: reviews.length, reviews });
};
```

```ts
/*
result: IAggregateResult[] = await this.aggregate(...)
explicitly states that result is of type IAggregateResult[], 
so TypeScript will not attempt to infer the type from the 
return value of this.aggregate(...). 
*/

schema.static(
  "calculateAverageRating",
  async function (productId: Types.ObjectId): Promise<void> {
    console.log("calculate Average Rating : ", productId);
    const result: IAggregateResult[] = await this.aggregate([
      { $match: { product: productId } },
      {
        $group: {
          _id: "$product",
          averageRating: {
            $avg: "$rating",
          },
          numberOfReviews: {
            $sum: 1,
          },
        },
      },
    ]);

    console.log("result = ", result);
  },
);

```

```ts

/* 
this.aggregate<IAggregateResult>(...)
TypeScript can infer the type of result based on that
*/

schema.static(
  "calculateAverageRating",
  async function (productId: Types.ObjectId): Promise<void> {
    console.log("calculate Average Rating : ", productId);
    const result = await this.aggregate<IAggregateResult>([
      { $match: { product: productId } },
      {
        $group: {
          _id: "$product",
          averageRating: {
            $avg: "$rating",
          },
          numberOfReviews: {
            $sum: 1,
          },
        },
      },
    ]);

    console.log("result = ", result);
  },
);
```
