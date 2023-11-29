import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import userModel from "../models/user.model.js";
import { env } from "../utils/env.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await userModel.getUserByEmail(email);
      if (!user) {
        console.log("no user.");
        return done(null, false, { message: "Incorrect email." });
      }
      if (!userModel.correctPassword(user.password, password)) {
        console.log("incorrect password.");
        return done(null, false, { message: "Incorrect password." });
      }
      console.log("correct password.");
      return done(null, user);
    }
  )
);

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: env.GOOGLE_CLIENT_ID,
//       clientSecret: env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `https://ec2-13-236-23-10.ap-southeast-2.compute.amazonaws.com/api/1.0/user/signup/google/callback`,
//       // callbackURL: `https://localhost:8000/api/1.0/user/signup/google/callback`,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const { email, name } = profile._json;
//       const user = {
//         email,
//         name,
//         provider: "google",
//         access_token: accessToken,
//       };
//       await userModel.signupByGoogle(user);
//       return done(null, profile);
//     }
//   )
// );

passport.serializeUser((user, done) => {
  console.log("serializeUser", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("deserializeUser", user);
  return done(null, user);
});
