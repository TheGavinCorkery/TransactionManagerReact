const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");

passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
);

passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((user, done) => {
    done(null,user)
});

const googleClientId = "523037228423-rptfpidl7eigv765eacg1bj8kfcu21lm.apps.googleusercontent.com";
const googleClientSecret = "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";