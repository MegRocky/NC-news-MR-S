const { selectEndpointsData } = require("../models/model-get-api");
const endpointsData = require("../endpoints.json");

exports.getApi = (req, res, next) => {
  res.status(200).send({ endpoints: endpointsData });
};
