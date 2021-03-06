import express, { json, urlencoded } from 'express';
import logger from './utils/logger';
import session from 'express-session';
import path from 'path';
import cors from 'cors';
import { SESSION_MAX_AGE, SESSION_SECRET } from './config';
import { httpLogger } from './middlewares/http-logger';
import { HttpError } from './lib/http-error';
import router from './router';

const app = express();

/* apply middleware */
app.use(cors({ origin: ['http://localhost:4200'], credentials: true }));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(httpLogger);

// configure express session
app.use(
    session({
        secret: SESSION_SECRET,
        name: 'quiz_sid',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: SESSION_MAX_AGE,
        },
    })
);

// define user object in express session
declare module 'express-session' {
    interface SessionData {
        user?: {
            id: string;
            email: string;
            type: string;
        };
        answerSheet?: {
            id: string;
        };
    }
}

// use router
app.use(router);

// serve angular build files
const ngDir = path.join(
    __dirname,
    '..',
    '..',
    'frontend',
    'dist',
    'ng-quiz-app'
);
console.log(ngDir);
app.use(express.static(ngDir));

/* GET Angular App */
app.get(['/', '/*'], function (req, res, next) {
    res.sendFile(path.join(ngDir, 'index.html'));
});

//error handler
app.use((err: Error, req, res, _next) => {
    if (err instanceof HttpError) {
        res.status(err.status).send(err.toJSON());
    } else if (err instanceof SyntaxError && 'body' in err) {
        res.status(400).send(err);
    } else if (err.name === 'CastError') {
        res.status(400).send('Invalid object id');
    } else {
        logger.error(err.message);
        res.status(500).send(
            process.env.NODE_ENV === 'development'
                ? err
                : 'Internal Server Error'
        );
    }
});

export default app;
