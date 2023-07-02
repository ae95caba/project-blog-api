var express = require("express");
var router = express.Router();
const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

const post_controller = require("../controllers/postController");

/* GET users listing. */
router.get("/", post_controller.post_list);

router.post("/", post_controller.post_create);

router.get("/:id", post_controller.post_detail);

router.delete("/:id", post_controller.post_delete);

router.put("/:id", post_controller.post_update);

module.exports = router;
