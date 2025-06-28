import express from "express";
import authController from "../controllers/auth.js";
import validateBody from "../middlewares/validateBody.js";
import registerSchema from "../validation/registerSchema.js";
import loginSchema from "../validation/loginSchema.js";

const router = express.Router();

// ✅ debug-роут перед усім
router.post('/debug', (req, res) => {
  console.log("🪵 DEBUG BODY:", req.body);
  res.json({ body: req.body });
});

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

export default router;








