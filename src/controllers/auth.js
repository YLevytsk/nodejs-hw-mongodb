import authService from "../services/auth.js";

const register = async (req, res, next) => {
  try {
    console.log("📦 Register req.body:", req.body); 
    const result = await authService.registerUser(req.body);
    res.status(201).json({
      status: "success",
      message: "Successfully registered a user!",
      data: result,
    });
  } catch (error) {
    console.error("❌ Register error:", error.message);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    console.log("🔐 Login req.body:", req.body); 
    const { accessToken, refreshToken } = await authService.loginUser(req.body);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        status: "success",
        message: "Successfully logged in an user!",
        data: { accessToken },
      });
  } catch (error) {
    console.error("❌ Login error:", error.message); 
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    console.log("🔄 Refresh token from cookie:", oldRefreshToken); 

    const { accessToken, refreshToken } = await authService.refreshSession(oldRefreshToken);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        status: "success",
        message: "Successfully refreshed a session!",
        data: { accessToken },
      });
  } catch (error) {
    console.error("❌ Refresh error:", error.message); 
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log("🚪 Logout refresh token:", refreshToken); 
    await authService.logoutUser(refreshToken);

    res.clearCookie("refreshToken");
    res.sendStatus(204);
  } catch (error) {
    console.error("❌ Logout error:", error.message); 
    next(error);
  }
};

export default {
  register,
  login,
  refresh,
  logout,
};





