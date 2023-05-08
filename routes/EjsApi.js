const express = require("express");
const router = express.Router();
const loginAuth = middleware("loginAuth");


// MAIN PAGE //

router.get('/', async (req, res) => {
    return res.render('main')
});



// SIGNUP PAGE //

router.get('/user_signup', async (req, res) => {
    return res.render('signup')
});



// LOGIN PAGE //

router.get('/user_login', async (req, res) => {
    return res.render('login')
});



// WELCOME PAGE //

router.get('/welcome', loginAuth, async (req, res) => {
    return res.render('welcome')
});



// CHANGE PASSWORD PAGE //

router.get('/change_password', loginAuth, async (req, res) => {
    return res.render('change-password')
});



// USER LIVE CHAT //

router.get('/live_chat', loginAuth, async (req, res) => {
    return res.render('live-chat')
});



module.exports = router;