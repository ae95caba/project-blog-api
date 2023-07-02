const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const { body, validationResult } = require("express-validator");

exports.post_create = [
  getBearerHeaderToSetTokenStringOnReq,
  // Validate body and sanitize fields.
  body("content", "content must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body("published", "post must be specified")
    .trim()

    .escape(),
  body("title", "title must be specified").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.

  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    console.log(`body content is:${req.body.content}`);

    const post = new Post({
      content: req.body.content,
      title: req.body.title,
      timestamp: new Date(),
      published: req.body.published ? true : false,
    });

    if (!errors.isEmpty()) {
      // There are errors.

      res.status(422).json({ error: "Validation failed" });
      return;
    } else {
      try {
        // Data from form is valid
        jwt.verify(req.token, "secretkey");
        await post.save();
        res.status(200).json({ post });
      } catch (err) {
        console.log(err);
      }
    }
  },
];

function getBearerHeaderToSetTokenStringOnReq(req, res, next) {
  const bearerHeader = req.headers?.authorization;
  if (typeof bearerHeader !== "undefined") {
    //bearer header format : Bearer <token>

    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    req.token = bearerToken;
    next();
  } else {
    next();
  }
}

exports.post_list = [
  getBearerHeaderToSetTokenStringOnReq,
  asyncHandler(async (req, res, next) => {
    const posts = await Post.find({}).exec();
    //authData is what i passed in the jwt.sign

    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        const publishedPosts = posts.filter((post) => post.published);
        res.json(publishedPosts);
      } else {
        res.json(posts);
      }
    });
  }),
];

exports.post_update = [
  getBearerHeaderToSetTokenStringOnReq,
  // Validate body and sanitize fields.
  body("content", "content must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body("published", "post must be specified")
    .trim()
    .isBoolean()

    .escape(),
  body("timestamp", "timestamp must be specified")
    .trim()
    .isISO8601()
    .toDate()
    .escape(),

  body("title", "title must be specified").trim().isLength({ min: 1 }).escape(),

  async (req, res, next) => {
    const updatedPost = new Post({
      content: req.body.content,
      title: req.body.title,
      timestamp: req.body.timestamp,
      published: req.body.published,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ error: "Validation failed" });
    } else {
      try {
        jwt.verify(req.token, "secretkey");
        await Post.findByIdAndUpdate(req.params.id, updatedPost, {});
        res.status(200).json({});
      } catch (error) {
        console.log("Error occurred bro:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
];

exports.post_delete = [
  getBearerHeaderToSetTokenStringOnReq,
  async (req, res, next) => {
    try {
      //if v erification vails , an error will be thrown
      jwt.verify(req.token, "secretkey");
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "post deleted" });
    } catch (error) {
      console.log(`error : ${error}`);
      next(error);
    }
  },
];

exports.post_detail = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  res.json(post);
});
