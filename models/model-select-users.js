const db = require("../db/connection.js");
const { checkIfValidUserExists } = require("./model-utils.js");

selectUsers = () => {
  return db.query("SELECT * FROM users").then((users) => {
    return users.rows;
  });
};

selectUsersByUsername = (username) => {
  return checkIfValidUserExists(username).then((user) => {
    return user.rows[0];
  });
};

module.exports = { selectUsers, selectUsersByUsername };
