const endpointsData = require("../endpoints.json");
const selectTopics = require("../models/model-select-topics.js");
exports.getApi = (req, res, next) => {
  res
    .status(200)
    .send({ endpoints: endpointsData })
    .catch((err) => {
      next(err);
    });
};

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics: topics.rows });
    })
    .catch((err) => {
      next(err);
    });
};
