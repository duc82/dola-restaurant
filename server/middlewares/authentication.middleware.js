const AuthService = require("../services/auth.service");

const authService = new AuthService();

async function authenticationMiddleware(req, res, next) {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "Bạn chưa được ủy quyền" });
  }

  try {
    const payload = await authService.verifyJwtToken(accessToken); // { userId: user._id,role: user.role}
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

module.exports = authenticationMiddleware;
