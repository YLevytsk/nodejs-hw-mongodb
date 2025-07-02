import jwt from "jsonwebtoken";
import createError from "http-errors";
import User from "../models/userModel.js";
import { sendResetPasswordEmail } from "../services/emailService.js";

export const sendResetEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404, "User not found!");
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

  const resetLink = `${process.env.APP_DOMAIN}/reset-password?token=${token}`;

  // 👇 Додай це!
  console.log("🔗 Reset password link:", resetLink);

  try {
    await sendResetPasswordEmail(email, resetLink);
  } catch (error) {
    console.error("Email sending error:", error.message);
    throw createError(
      500,
      "Failed to send the email, please try again later."
    );
  }

  res.status(200).json({
    status: 200,
    message: "Reset password email has been successfully sent.",
    data: {},
  });
};


