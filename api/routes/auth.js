var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');
var db = require('../services/db');
var passport = require('passport');

router.post("/signin", passport.authenticate('local', { session: true}),
    function(req,res) {
        req.session.userId = req.user.id    
        res.cookie('userid', req.user.id, { maxAge: 2592000000 });
        res.sendStatus(200);
    }
);


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

router.get("/signedin", async function(req, res, next) {
    try {  
        if(req.session.userId) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }     
    } catch (e) {
        console.log(e);
        res.sendStatus(403);
    }
});

module.exports = router;