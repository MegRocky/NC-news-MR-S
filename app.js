const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router.js");
const {
  internalServerError,
  badRequest,
  idNotFound,
} = require("./error-handling.js");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "URL not found" });
});

app.use(badRequest);
app.use(idNotFound);
app.use(internalServerError);
module.exports = app;
