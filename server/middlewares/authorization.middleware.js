const authenticationMiddleware = require("./authentication.middleware");

function authorizationMiddleware(req, res, next) {
  authenticationMiddleware(req, res, () => {
    if (req.user.role === "admin") {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "You don't have permission to do this" });
    }
  });
}

module.exports = authorizationMiddleware;
