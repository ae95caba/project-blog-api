const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

exports.index_detail = (req, res, next) => {
  res.render("index", { title: "Express" });
};

exports.index_signup = [
  // Validate body and sanitize fields.
  body("username", "username must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "password must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    console.log(`body content is:${req.body}`);

    const plainPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = new User({
      password: hashedPassword,
      username: req.body.username,
    });

    const usernameTaken = await User.find({ username: req.body.username });

    if (!errors.isEmpty()) {
      // There are errors.

      res.status(422).json({ error: "Validation failed" });
      return;
    } else if (usernameTaken.length >= 1) {
      console.log(`userTaken is ${typeof usernameTaken}`);
      res.status(409).json({ error: "Username taken" });
      return;
    } else {
      // Data from form is valid
      await user.save();
      console.log("user saved !");

      res.status(200).json({ user });
    }
  }),
];

exports.index_signin = [
  // Validate body and sanitize fields.
  body("username", "username must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "password must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    console.log(`body content is:${req.body.content}`);

    const user = new User({
      password: req.body.password,
      username: req.body.username,
    });

    if (!errors.isEmpty()) {
      // There are errors.

      res.status(422).json({ error: "Validation failed" });
      return;
    } else {
      // Data from form is valid
      /*   await user.save(); */

      res.status(200).json({ user });
    }
  }),
];
