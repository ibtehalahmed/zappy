var express = require('express');
var router = express.Router();

var tweet = require("./tweet");
router.use('/tweets', tweet);

module.exports = router;
