const authenticationMiddleware = require("./authentication.middleware");

function authorizationMiddleware(req, res, next) {
  authenticationMiddleware(req, res, () => {
    if (req.user.role === "admin") {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền để làm điều này" });
    }
  });
}

module.exports = authorizationMiddleware;
