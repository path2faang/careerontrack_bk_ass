import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rootRoutes from './rootRoutes.js';
import passport from 'passport';
import session from 'express-session';

export default (app) => {
    app.use(express.json());

    express.urlencoded({ extended: true });
    
    const allowedOrigins = [
        "https://assessment-career-ontrack.vercel.app",
        "https://careerontrack-bk-ass.onrender.com",
        "https://google.com"
    ];
    
    app.use(cors({
        origin: (origin, callback) => {
            if (process.env.NODE_ENV === "dev") {
                callback(null, true); // Allow localhost in development
            } else if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("CORS not allowed for this origin"), false);
            }
        },
        methods: ['POST', 'PUT', 'PATCH', 'DELETE', 'GET'],
        allowedHeaders: ['Authorization', 'Content-Type', 'Content-Length', 'Cookie', 'Accept'],
        credentials: true
    }));
    

    app.use(helmet());

    app.use(compression())

    app.use(cookieParser(process.env.COOKIE_SECRET));

    app.use(session({
        secret: process.env.COOKIE_SECRET,
        saveUninitialized: true,
        resave: false,
        cookie: { secure: process.env.NODE_ENV == "dev" ? false : true } // set `secure: true` if using HTTPS
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    rootRoutes(app);

}