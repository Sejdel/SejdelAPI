var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');
var db = require('../services/db');
var passport = require('passport');
var Cookies = require('universal-cookie');

router.post("/signin", passport.authenticate('local', { session: true}),
    function(req,res) {
        db('users').where({id: req.user.id}).update({last_login: db.fn.now()}).then(row => {
            db('users').where({id: req.user.id}).first().then(row => {
                req.session.userId = req.user.id; 
                res.cookie('name', row.first_name, { maxAge: 2592000000 }); 
                res.cookie('userid', req.user.id, { maxAge: 2592000000 });
                res.sendStatus(200);
            });
        })
    }
);

router.post("/signout", function(req, res){
    req.logout();
    req.session.destroy();
    res.clearCookie('userid');
    res.redirect('/');
  });


router.post("/signup", async function(req, res, next) {
    console.log(req.body);
    try {
        const hashedPasword = await bcrypt.hash(req.body.password, 10);
        db('users').insert({
            email: req.body.email,
            password: hashedPasword,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            tel_number: req.body.phoneNr
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