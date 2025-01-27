exports.badRequest = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
};

exports.idNotFound = (err, req, res, next) => {
  if (err.msg === "Article Not Found") {
    res.status(404).send({ msg: err.msg });
  } else next(err);
};

exports.internalServerError = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error!" });
};
