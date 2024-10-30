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

    const allowedOrigins = ["https://assessment-career-ontrack.vercel.app"];

    app.use(cors({
        methods: ['POST', 'PUT', 'PATCH', 'DELETE', 'GET'],
        credentials: true,
        allowedHeaders: ['Authorization', 'Content-Type', 'Content-Length'],
        origin: process.env.NODE_ENV == "dev" ? ["http://localhost:3000"] : function (origin, callback) {
            if (!origin) return callback(null, true); // Allow requests with no origin
            if (allowedOrigins.indexOf(origin) === -1) {
                return callback(new Error('CORS not allowed for this origin'), false);
            }
            return callback(null, origin);
        }
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