import jwt from "jsonwebtoken";
import createError from "http-errors";
import User from "../models/userModel.js";
import Session from "../models/sessionModel.js"; 
import bcrypt from "bcryptjs";

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch  {
    throw createError(401, "Token is expired or invalid.");
  }

  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    throw createError(404, "User not found!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();

 
  await Session.deleteMany({ user: user._id });

  res.status(200).json({
    status: 200,
    message: "Password has been successfully reset.",
    data: {},
  });
};

