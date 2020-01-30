var express = require('express');
var router = express.Router();
var db = require('../services/db');

/* GET hs */
router.get('/highscore', function(req, res, next) {
  try {
    db("highscore").select().then(r => {
      console.log(r);
      res.json(r);
    });
  } catch(error) {
    console.log(error);
    res.status(500).json({ error });
  }
});


module.exports = router;
