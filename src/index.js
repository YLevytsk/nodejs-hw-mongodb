import dotenv from 'dotenv';
dotenv.config();

import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';


process.on('uncaughtException', (err) => {
  console.error('❌ [uncaughtException] Uncaught exception:', err.message);
  console.error(err.stack);
  process.exit(1);
});


process.on('unhandledRejection', (reason) => {
  console.error('❌ [unhandledRejection] Unhandled promise rejection:', reason);
});


const bootstrap = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (err) {
    console.error('❌ Failed to launch application:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
};

bootstrap();
