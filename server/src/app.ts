import express, { json } from 'express';
import logger from './utils/logger';
import { httpLogger } from './middlewares/http-logger';
import { HttpError } from './lib/http-error';
import router from './router';

const app = express();


/* apply middleware */
app.use(json());
app.use(httpLogger);

// use router
app.use(router);

//error handler
app.use((err, req, res, _next) => {
    if (err instanceof HttpError) {
        res.status(err.status).send(err.toJSON());
    } else {
        logger.error(err);
        res.status(500).send(
            process.env.NODE_ENV === 'development'
                ? err
                : 'Internal Server Error',
        );
    }
});

export default app;
