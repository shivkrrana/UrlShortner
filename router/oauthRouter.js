const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("hello world");
})

router.get('/google',passport.authenticate('google',{
    scope:['profile']
}))

router.get('/google/redirect',passport.authenticate('google', {scope:['profile']}),(req,res)=>{
    console.log(req);
    res.send(req.user);
})

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})

module.exports = router;