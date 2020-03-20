var express = require('express');
var router = express.Router();
var db = require('../services/db');
var {isUser, isPatron, isMod, isAdmin} = require('../services/authorize');


/* GET hs */
router.get('/highscore', isUser, function(req, res, next) {
  try {
    db("highscore").select().then(r => {
      res.json(r);
    });
  } catch(error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

/* GET pf */
router.get('/pourfeed', isUser, function(req, res, next) {
  try {
    db("pour_feed").select().then(r => {
      res.json(r);
    });
  } catch(error) {
    console.log(error);
    res.status(500).json({ error });
  }
});


module.exports = router;
