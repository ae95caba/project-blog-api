var express = require("express");
var router = express.Router();

const posts = [
  {
    title: "Post 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    userId: "randomUser1",
    published: true,
    id: 1,
  },
  {
    title: "Post 2",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    userId: "randomUser2",
    published: false,
    id: 2,
  },

  {
    title: "Post 3",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    userId: "randomUser3",
    published: true,
    id: 3,
  },
  {
    title: "Post 4",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    userId: "randomUser4",
    published: true,
    id: 4,
  },
  {
    title: "Post 5",
    id: 5,
    content:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
    userId: "randomUser5",
    published: false,
  },
];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json(posts);
});

router.post("/", function (req, res, next) {
  res.send("you posted");
});

router.get("/:id", function (req, res, next) {
  res.json(posts[req.params.id]);
});

module.exports = router;
