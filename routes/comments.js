var express = require("express");
var router = express.Router();

const comments = [
  {
    content: "Hello, how are you?",
    userId: "user1",
    timestamp: new Date(),
    postId: 1,
    id: 1,
  },
  {
    content: "I'm doing great, thanks!",
    userId: "user2",
    timestamp: new Date(),
    postId: 2,
    id: 2,
  },
  {
    content: "What's your plan for the weekend?",
    userId: "user3",
    timestamp: new Date(),
    postId: 3,
    id: 3,
  },
  {
    content: "What's your plan for the year?",
    userId: "user3",
    timestamp: new Date(),
    postId: 2,
    id: 4,
  },
];

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
router.get("/posts/:postid/comments", function (req, res, next) {
  function findCommentsByPostId(postId, comments) {
    console.log(`the postid is ${postId}`);
    return comments.filter((comment) => comment.postId === postId);
  }
  res.json(findCommentsByPostId(+req.params.postid, comments));
});

router.post("/posts/:postid/comments", function (req, res, next) {
  res.send("you posted a comment");
});

router.get("/posts/:postid/comments/:commentid", function (req, res, next) {
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
  res.json(findCommentByCommentId(+req.params.commentid, comments));
});

module.exports = router;
