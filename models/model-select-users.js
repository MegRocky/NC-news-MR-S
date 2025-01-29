const db = require("../db/connection.js");

selectUsers = () => {
  return db.query("SELECT * FROM users").then((res) => {
    return res.rows;
  });
};

module.exports = selectUsers;
