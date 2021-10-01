import app from './app';
import config from './config';
import logger from './utils/logger';
import { initDBConnection } from './lib/mongodb';
import './utils/exitHandler';

const startServer = async () => {
    //connect to database
    await initDBConnection();

    //start listening
    app.listen(config.PORT, async () => {
        logger.info(`app started on port ${config.PORT}`);
    });
};

startServer();
