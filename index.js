const express = require("express");
const passport = require("passport");
const app = express();
const urlRouter = require('./router/urlRouter')
const oauthRouter = require('./router/oauthRouter')
const userRouter = require('./router/userRouter')
const cron = require('node-cron');
const cookie = require('cookie-session')
const ShortUrl = require('./model/urlModel');
require('dotenv').config();
require('./oauth-setup');
require('./db');

app.use(express.json());

app.use(cookie({
    maxAge:1000*60*60*24,
    keys:['kjnkjdsnccsdc']
}))

app.use(passport.initialize());
app.use(passport.session());

//routers
app.use(oauthRouter);
app.use(urlRouter);
app.use(userRouter)

// for job scheduling
cron.schedule('0 0 * * 0-7', async() => {
    const newDate = Date.now() - 30*24*60*60*1000;
    await ShortUrl.remove({createdAt: {$lt: newDate}})
  });

app.listen(3000,()=>{
    console.log("Server is Listening at 3000")
})