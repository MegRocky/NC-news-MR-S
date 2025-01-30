const {
  deleteCommentByCommentID,
} = require("../controllers/control-delete-api");

const commentsRouter = require("express").Router();

commentsRouter.delete("/:comment_id", deleteCommentByCommentID);

module.exports = commentsRouter;
