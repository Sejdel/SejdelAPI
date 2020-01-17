var express = require("express");
var router = express.Router();
var db = require('../services/db');


router.get("/", function(req, res, next) {
    db.select('*').from('users').then( data => {
      console.log(data);
      res.send(data);
    })
});

module.exports = router;