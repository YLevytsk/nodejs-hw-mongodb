import dotenv from 'dotenv';
dotenv.config();

import { initMongoConnection } from './db/initMongoConnection.js';
import app from './server.js';

const PORT = process.env.PORT || 300;

process.on('uncaughtException', () => {
  process.exit(1);
});

process.on('unhandledRejection', () => {
  // nothing
});

const bootstrap = async () => {
  try {
    await initMongoConnection();
    app.listen(PORT);
  } catch {
    process.exit(1);
  }
};

bootstrap();


