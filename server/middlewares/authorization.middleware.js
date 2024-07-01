const authentication = require("./authentication.middleware");

module.exports = (req, res, next) => {
  authentication(req, res, () => {
    if (req.user.role === "admin") {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền để làm điều này" });
    }
  });
};
