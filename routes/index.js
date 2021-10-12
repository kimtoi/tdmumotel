var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');

const HomeCtrl = require('../controllers/home.controller');

/* GET home page. */
router
    .get(
        '/',
        HomeCtrl.index
    )

    .get(
        '/login',
        notLoggedIn,
        HomeCtrl.login
    )

    .post(
        '/login',
        passport.authenticate('local-login', {
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true
        })
    )

    .get(
        '/about',
        HomeCtrl.about
    )

    .get(
        '/register',
        notLoggedIn,
        HomeCtrl.register
    )

    .post(
        '/register',
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/register',
            failureFlash: true
        })
    )

    .get(
        '/logout', 
        (req, res) => {
            req.logout();
            res.redirect('/');
        }
    )

    .get(
        '/motel',
        HomeCtrl.motel
    )

    
module.exports = router;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        res.redirect('/');
    return next();
}
