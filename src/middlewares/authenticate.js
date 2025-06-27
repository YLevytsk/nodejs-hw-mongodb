import jwt from "jsonwebtoken";
import createError from "http-errors";

import User from "../models/userModel.js";
import Session from "../models/sessionModel.js";

const { JWT_ACCESS_SECRET = "" } = process.env;


const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw createError(401, "No access token provided");
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_ACCESS_SECRET);
    } catch (err) {
      
      if (err.name === "TokenExpiredError") {
        throw createError(401, "Access token expired");
      }
      throw createError(401, "Invalid access token");
    }

    
    const session = await Session.findOne({ accessToken: token });
    if (!session) {
      throw createError(401, "Session not found");
    }

   
    const user = await User.findById(payload.userId).select("-password");
    if (!user) {
      throw createError(401, "User not found");
    }

    
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;

