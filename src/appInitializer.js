import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rootRoutes from './rootRoutes.js';
import passport from 'passport';
import session from 'express-session';

export default (app) => {
    express.json();

    express.urlencoded({ extended: true });

    app.use(cors());

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