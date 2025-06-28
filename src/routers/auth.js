import express from "express";
import authController from "../controllers/auth.js";
import validateBody from "../middlewares/validateBody.js";
import registerSchema from "../validation/registerSchema.js";
import loginSchema from "../validation/loginSchema.js";

const router = express.Router();

// ✅ Временный DEBUG-маршрут — проверка что тело доходит до сервера
router.post("/debug", (req, res) => {
  console.log("🔥 DEBUG BODY:", req.body);
  res.status(200).json({ received: req.body });
});

// ✅ Регистрация с логом тела запроса
router.post(
  "/register",
  (req, res, next) => {
    console.log("🚀 REGISTER BODY:", req.body);
    next();
  },
  validateBody(registerSchema),
  authController.register
);

// ✅ Логин с логом тела запроса
router.post(
  "/login",
  (req, res, next) => {
    console.log("🚀 LOGIN BODY:", req.body);
    next();
  },
  validateBody(loginSchema),
  authController.login
);

// 🔁 Обновление токена
router.post("/refresh", authController.refresh);

// 🔒 Выход
router.post("/logout", authController.logout);

export default router;







