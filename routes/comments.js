var express = require("express");
var router = express.Router();

const comment_controller = require("../controllers/commentController");

/* GET users listing. */
router.get("/posts/:postid/comments", comment_controller.comment_list);

router.post("/posts/:postid/comments", comment_controller.comment_create);

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
