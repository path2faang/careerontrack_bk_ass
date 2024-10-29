import passport from 'passport';
import accountModel from '../src/models/account.model.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import envLoader from '../config/envLoader.js';

envLoader();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profileDetail, cb) => {
    try {
        let account;
        let profile = profileDetail._json;

        // Check if account exists
        account = await accountModel.findOne({ email: profile.email });

        if (!account) {
            // Create a new account if none exists
            account = await accountModel.create({
                email: profile.email,
                provider_id: profile.sub,
                profile_img: profile.picture,
                provider_name: 'google',
                display_name: profile.name
            });
        }

        // Pass accessToken and refreshToken along with account
        return cb(null, account, { accessToken, refreshToken });
    } catch (error) {
        console.error("Error during Google authentication:", error);
        return cb(error);
    }
}));


// Serialize the user ID to store in the session
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Deserialize the user ID to retrieve the user object
passport.deserializeUser(async (id, done) => {
    try {
        const user = await accountModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
