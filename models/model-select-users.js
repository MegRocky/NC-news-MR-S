const db = require("../db/connection.js");
const { checkIfValidUserExists } = require("./model-utils.js");

selectUsers = () => {
  return db.query("SELECT * FROM users").then((res) => {
    return res.rows;
  });
};

selectUsersByUsername = (username) => {
  return checkIfValidUserExists(username).then((res) => {
    return res.rows[0];
  });
};

module.exports = { selectUsers, selectUsersByUsername };
