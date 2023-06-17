var express = require("express");
var router = express.Router();

const comments = [
  {
    content: "Hello, how are you?",
    userId: "user1",
    timestamp: new Date(),
  },
  {
    content: "I'm doing great, thanks!",
    userId: "user2",
    timestamp: new Date(),
  },
  {
    content: "What's your plan for the weekend?",
    userId: "user3",
    timestamp: new Date(),
  },
];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json(comments);
});

router.post("/", function (req, res, next) {
  res.send("you posted a comment");
});

router.get("/:id", function (req, res, next) {
  res.json(comments[req.params.id]);
});

module.exports = router;
