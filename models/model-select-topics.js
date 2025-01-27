const db = require("../db/connection.js");

selectTopics = () => {
  return db.query("SELECT * FROM topics");
};

module.exports = selectTopics;
