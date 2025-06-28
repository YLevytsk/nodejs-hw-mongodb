import dotenv from 'dotenv';
dotenv.config();

import { initMongoConnection } from './db/initMongoConnection.js';
import app from './server.js';

const PORT = process.env.PORT || 300;

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

    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to launch application:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
};

bootstrap();

