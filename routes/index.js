var express = require("express");
var router = express.Router();
const index_controller = require("../controllers/indexController");

/* GET home page. */
router.get("/", index_controller.index_detail);

router.post("/signup", index_controller.index_signup);

//sends token on 200
router.post("/signin", index_controller.index_signin);

router.post("/auth", index_controller.index_auth);

module.exports = router;
