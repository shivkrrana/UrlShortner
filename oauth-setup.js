const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})

passport.use(new GoogleStrategy({
    callbackURL:'/google/redirect',
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET
},(accessToken, refreshToken, profile, done)=>{
        done(null, profile, accessToken)
}))