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
