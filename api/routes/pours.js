var express = require('express');
var router = express.Router();
var db = require('../services/db');

/* GET pours */
router.get('/', async function(req, res, next) {
  try {
    const pours = await db('pours').where(req.body).select();
    res.status(200).json(pours);
  } catch(error) {
    res.status(500).json({ error });
  }
});

/* POST pour */
router.post('/', async function(req, res, next) {   
    try {
      const pour = req.body;
      kegs = await db('kegs').orderBy('id', 'desc').limit(1);
      pour.keg_id = kegs[0].id
      const id = await db('pours').insert(pour, 'id');
      res.status(201).json({ id });
    } catch(error) {
      res.status(500).json({ error });
    }
  });

module.exports = router;
