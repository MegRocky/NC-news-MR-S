const db = require("../db/connection.js");

selectTopics = () => {
  return db.query("SELECT * FROM topics").then((res) => {
    return res.rows;
  });
};

module.exports = selectTopics;
