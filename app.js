const express = require("express");
const app = express();
const { getApi, getTopics } = require("./controllers/control-get-api.js");

app.get("/api", getApi);
app.get("/api/topics", getTopics);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "URL not found" });
});

module.exports = app;
