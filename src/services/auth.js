import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "http-errors";

import User from "../models/userModel.js";
import Session from "../models/sessionModel.js";

// НЕ создаём глобальные константы из process.env!!!

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const userData = newUser.toObject();
  delete userData.password;

  return userData;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw createError(401, "Invalid email or password");
  }

  await Session.deleteMany({ userId: user._id });

  // Проверяем переменные окружения перед использованием!
  console.log('LOGIN: JWT_ACCESS_SECRET:', process.env.JWT_ACCESS_SECRET);
  console.log('LOGIN: JWT_REFRESH_SECRET:', process.env.JWT_REFRESH_SECRET);

  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000);
  const refreshTokenValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return { accessToken, refreshToken };
};

const refreshSession = async (oldRefreshToken) => {
  if (!oldRefreshToken) {
    throw createError(401, "Missing refresh token");
  }

  let payload;
  try {
    payload = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    throw createError(401, "Invalid refresh token");
  }

  const session = await Session.findOne({ refreshToken: oldRefreshToken });
  if (!session) {
    throw createError(401, "Session not found");
  }

  const user = await User.findById(payload.userId);
  if (!user) {
    throw createError(401, "User not found");
  }

  await Session.deleteMany({ userId: user._id });

  const newAccessToken = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const newRefreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000);
  const refreshTokenValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await Session.create({
    userId: user._id,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

const logoutUser = async (refreshToken) => {
  if (!refreshToken) {
    throw createError(401, "No refresh token provided");
  }

  await Session.findOneAndDelete({ refreshToken });
};

export default {
  registerUser,
  loginUser,
  refreshSession,
  logoutUser,
};





