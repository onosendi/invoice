// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  res.status(500).json({ code: err.code });
};
