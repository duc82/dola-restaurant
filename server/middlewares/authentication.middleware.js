const { verifyJwtToken } = require("../utils/jwt.util");

async function authenticationMiddleware(req, res, next) {
  const accessToken =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "You are not authenticated" });
  }

  try {
    const payload = await verifyJwtToken(accessToken); // { userId: user._id,role: user.role}
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

module.exports = authenticationMiddleware;
