import { closeConnection } from '../lib/mongodb';

// attach event handlers to close database connection

// This will handle process.exit():
process.on('exit', closeConnection);

// This will handle kill commands, such as CTRL+C:
process.on('SIGINT', closeConnection);
process.on('SIGTERM', closeConnection);

// This will prevent dirty exit on code-fault crashes:
process.on('uncaughtException', closeConnection);
