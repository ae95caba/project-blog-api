const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

exports.comment_create = [
  // Validate body and sanitize fields.
  body("content", "content must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("timestamp", "timestamp must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body("post", "post must be specified").trim().isLength({ min: 1 }).escape(),
  body("username", "username must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    console.log(`body content is:${req.body.content}`);

    const comment = new Comment({
      content: req.body.content,
      username: req.body.username,
      timestamp: req.body.timestamp,
      post: req.body.post,
    });

    if (!errors.isEmpty()) {
      // There are errors.

      res.status(422).json({ error: "Validation failed" });
      return;
    } else {
      // Data from form is valid
      await comment.save();
      res.status(200).json({ comment });
    }
  }),
];

exports.comment_list = asyncHandler(async (req, res, next) => {
  console.log(`the params postid is :${req.params.postid}`);
  const comments = await Comment.find({ post: req.params.postid }).exec();
  console.log(`the comments are ${comments}`);
  res.json(comments);
});

exports.comment_detail = function (req, res, next) {
  console.log(`the comment id is :${+req.params.commentid}`);
  function findCommentByCommentId(commentId, comments) {
    let result;
    comments.forEach((comment) => {
      if (comment.id === commentId) {
        result = comment;
      }
    });
    return result;
  }
  res.json(findCommentByCommentId(req.params.commentid, comments));
};

exports.comment_delete = asyncHandler(async (req, res, next) => {
  try {
    console.log(`the params comentid is : ${req.params.commentid}`);
    const comment = await Comment.findByIdAndDelete(req.params.commentid);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
