const {
  deleteCommentByCommentID,
} = require("../controllers/control-delete-api");
const { patchVotesByCommentId } = require("../controllers/control-patch-api");

const commentsRouter = require("express").Router();

commentsRouter
  .route("/:comment_id")
  .delete(deleteCommentByCommentID)
  .patch(patchVotesByCommentId);

module.exports = commentsRouter;
