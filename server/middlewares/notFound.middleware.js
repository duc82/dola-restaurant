module.exports = (req, res) => {
  return res.status(404).json({
    message: `Not Found - ${req.originalUrl}`,
  });
};
