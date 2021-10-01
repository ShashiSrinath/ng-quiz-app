import dotenv from 'dotenv';

dotenv.config();

/**
 * Env variables
 * NODE_ENV
 * DATABASE_URL
 * DATABASE_NAME(optional)
 */


// values according to current env
let _databaseURL, _databaseName, _logFile;
switch (process.env.NODE_ENV) {
    case 'production':
        _databaseURL = process.env.DATABASE_URL_PROD || process.env.DATABASE_URL;
        _databaseName = process.env.DATABASE_NAME_PROD || process.env.DATABASE_NAME;
        _logFile = 'log.log';
        break;
    case 'test':
        _databaseURL = process.env.DATABASE_URL_TEST || process.env.DATABASE_URL;
        _databaseName = process.env.DATABASE_NAME_TEST || process.env.DATABASE_NAME;
        _logFile = 'log-test.log';
        break;
    default:
        _databaseURL = process.env.DATABASE_URL;
        _databaseName = process.env.DATABASE_NAME;
        _logFile = 'log-dev.log';
}

export const SESSION_SECRET = process.env.SESSION_SECRET || 'supersecretdonotshare';
export const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE
    ? parseInt(process.env.SESSION_MAX_AGE)
    : 1000 * 60 * 60 * 24 * 7;


export default {
    PORT: process.env.PORT || 3000,
    DB_URI: _databaseURL,
    DB_NAME: _databaseName,
    LOG_FILE: _logFile,
    SESSION_SECRET,
    SESSION_MAX_AGE
};
