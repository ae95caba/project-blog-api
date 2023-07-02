var express = require("express");
var router = express.Router();

const comment_controller = require("../controllers/commentController");

/* GET users listing. */
router.get("/posts/:postid/comments", comment_controller.comment_list);

router.post("/posts/:postid/comments", comment_controller.comment_create);

router.get(
  "/posts/:postid/comments/:commentid",
  comment_controller.comment_detail
);

router.delete(
  "/posts/:postid/comments/:commentid",
  comment_controller.comment_delete
);

module.exports = router;
