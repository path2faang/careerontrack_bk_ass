import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import requireAuth from '../middlewares/auth.middleware.js';
const authRoutes = express.Router();

// Helper function to create a JWT
const createToken = (user, secret, expiresIn) => {
    return jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn });
};

// Initiate Google authentication
authRoutes.get("/v1/auth", requireAuth, (req, res) => res.status(200).json({ success: false, message: "successfully fetched", data: req.user })) // )Google Testing route

authRoutes.get('/v1/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
authRoutes.get('/v1/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', async (err, user) => {
        if (err) return next(err);
        if (!user) return res.redirect('/login');

        // Create custom access and refresh tokens
        const accessToken = createToken(user, process.env.ACCESS_TOKEN_SECRET, '7d'); // expires in 7 days
        const refreshToken = createToken(user, process.env.REFRESH_TOKEN_SECRET, '30d'); // expires in 30 days

        // Set cookies for access and refresh tokens
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod', // Secure in prod
            sameSite: process.env.NODE_ENV === 'prod' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            signed: process.env.NODE_ENV === 'prod'
        });
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod', // Secure in prod
            sameSite: process.env.NODE_ENV === 'prod' ? 'none' : 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            signed: process.env.NODE_ENV === 'prod'
        });
        

        // Redirect user after successful login
        return res.redirect(`https://assessment-career-ontrack.vercel.app`); // Replace with your post-login route
    })(req, res, next);
});

authRoutes.post("/v1/auth/logout", requireAuth, (req, res,) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod', // Use secure cookies in production
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.clearCookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod', // Use secure cookies in production
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    return res.sendStatus(204); //send No Content
})


export default authRoutes;
