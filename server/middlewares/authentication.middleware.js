const AuthService = require("../services/auth.service");

const authService = new AuthService();

module.exports = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({
      message: "Access token là bắt buộc",
    });
  }

  try {
    const payload = await authService.verifyJwtToken(accessToken); // { userId: user._id,role: user.role}
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};
