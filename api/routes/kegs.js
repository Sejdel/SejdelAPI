var express = require('express');
var router = express.Router();
var db = require('../services/db');

/* GET kegs */
router.get('/', async function(req, res, next) {
  try {
    const kegs = await db('kegs').where(req.body).select();
    res.status(200).json(kegs);
  } catch(error) {
    res.status(500).json({ error });
  }
});

/* POST keg */
router.post('/', async function(req, res, next) {
  const keg = req.body;
  if (!req.user) {
    res.status(401);
  } else {
    keg.created_by = req.user.id;
    try {
      const id = await db('kegs').insert(keg, 'id');
      res.status(201).json({ id });
    } catch(error) {
      res.status(500).json({ error });
    }
  }
});




module.exports = router;
