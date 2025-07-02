import express from "express";
import authController from "../controllers/auth.js";
import validateBody from "../middlewares/validateBody.js";
import registerSchema from "../validation/registerSchema.js";
import loginSchema from "../validation/loginSchema.js";
import { emailSchema, resetPwdSchema } from "../validation/authValidation.js";
import { sendResetEmail } from "../controllers/sendResetEmail.js";
import { resetPassword } from "../controllers/resetPassword.js";

const router = express.Router();

router.post(
  "/register",
  validateBody(registerSchema),
  authController.register
);

router.post(
  "/login",
  validateBody(loginSchema),
  authController.login
);

router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

router.post(
  "/send-reset-email",
  validateBody(emailSchema),
  sendResetEmail
);


router.post(
  "/reset-pwd",
  validateBody(resetPwdSchema),
  resetPassword
);

export default router;











