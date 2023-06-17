const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

exports.post_create = [
  // Validate body and sanitize fields.
  body("content", "content must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("timestamp", "timestamp must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body("published", "post must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("title", "title must be specified").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    console.log(`body content is:${req.body.content}`);

    const post = new Post({
      content: req.body.content,
      title: req.body.title,
      timestamp: req.body.timestamp,
      published: req.body.published,
    });

    if (!errors.isEmpty()) {
      // There are errors.

      res.status(422).json({ error: "Validation failed" });
      return;
    } else {
      // Data from form is valid
      await post.save();
      res.status(200).json({ post });
    }
  }),
];

exports.post_list = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({}).exec();
  res.json(posts);
});

exports.post_detail = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  res.json(post);
});
