var express = require('express');
var router = express.Router();
var db = require('../services/db');

/* GET Users */
router.get('/', async function(req, res, next) {
  try {
    const users = await (await db('users').where(req.body).select('id', 'email', 'tel_number', db.raw("CONCAT(first_name, ' ',last_name) AS name")).orderBy('name', 'asc'));
    res.status(200).json(users);
  } catch(error) {
    res.status(500).json({ error });
  }
});
  
module.exports = router;
