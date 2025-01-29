import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../Models/AuthModel.js";
import { configDotenv } from "dotenv";

configDotenv();

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.error("Google OAuth configuration is missing!");
    throw new Error("Google OAuth configuration is missing.");
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://jerins-parlour-server-gamma.vercel.app/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await UserModel.findOne({ email: profile.emails[0].value });

                if (!user) {
                    user = await UserModel.findOne({ googleId: profile.id });
                }

                if (!user) {
                    user = await UserModel.create({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        name: profile.displayName,
                        username: profile.displayName,
                        profilePic: profile.photos[0].value,
                    });
                } else if (!user.googleId) {
                    // If the user exists but doesn't have a googleId, update it
                    user.googleId = profile.id;
                    await user.save();
                }

                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    done(null, user);
});
