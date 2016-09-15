var express = require("express");
var router = express.Router();

var ctrlAuth = require("../controllers/authentication");
var ctrlSettings = require("../controllers/settings");

//test
router.get("/hello", function(req, res) {
  res.status(200);
  res.json({message: "fine"});
});

// authentication
router.post("/login", ctrlAuth.login);

// settings
router.get("/sandboxes", ctrlSettings.sandboxes);

 
module.exports = router;
