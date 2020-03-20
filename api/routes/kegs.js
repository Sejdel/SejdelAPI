var express = require('express');
var router = express.Router();
var db = require('../services/db');
var {isUser, isPatron, isMod, isAdmin} = require('../services/authorize');

/* GET kegs */
router.get('/', isMod, async function(req, res, next) {
  try {
    const kegs = await db('kegs').where(req.body).select();
    res.status(200).json(kegs);
  } catch(error) {
    res.status(500).json({ error });
  }
});

/* POST keg */
router.post('/', isMod, async function(req, res, next) {
  const keg = req.body; 
  keg.created_by = req.user.id;
  try {
    const id = await db('kegs').insert(keg, 'id');
    res.status(201).json({ id });
  } catch(error) {
    res.status(500).json({ error });
  }
});


module.exports = router;
