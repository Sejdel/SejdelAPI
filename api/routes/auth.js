var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');
var db = require('../services/db');
var passport = require('passport');



router.post("/signin", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    successMessage: 'Success',
    failureMessage: 'Fail',
    failureFlash: false
}));


router.post("/signup", async function(req, res, next) {
    try {
        const hashedPasword = await bcrypt.hash(req.body.password, 10);
        db('users').insert({
            email: req.body.email,
            password: hashedPasword
        }).then( data => {
            console.log(data);
            res.sendStatus(200);
        })
        
    } catch (e) {
        console.log(e);
        res.sendStatus(403);
    }
});

module.exports = router;