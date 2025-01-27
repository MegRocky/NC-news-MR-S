const express = require("express");
const app = express();
const { getApi } = require("./controllers/control-get-api.js");

app.get("/api", getApi);

module.exports = app;
