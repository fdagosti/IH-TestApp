var express = require("express");
var router = express.Router();

var ctrlAuth = require("../controllers/authentication");

//test
router.get("/hello", function(req, res) {
  res.status(200);
  res.json({message: "fine"});
});

// authentication
router.post("/login", ctrlAuth.login);

module.exports = router;
