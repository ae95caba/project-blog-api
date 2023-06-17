var express = require("express");
var router = express.Router();
const Post = require("../models/post");

const post_controller = require("../controllers/postController");

/* GET users listing. */
router.get("/", post_controller.post_list);

router.post("/", post_controller.post_create);

router.get("/:id", post_controller.post_detail);

module.exports = router;
