"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (req, res, next) => {
    if (req.query.user === "daniel") {
        console.log("User Authorized !");
        req.user = { name: "daniel", secret: "1234", id: "ident" };
        next();
    }
    else {
        return res.status(401).send("User Not Authorized !");
    }
};
exports.authorize = authorize;
