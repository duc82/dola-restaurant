module.exports = function (req, res) {
  return res.status(404).json({
    message: `Not Found - ${req.originalUrl}`
  });
};
