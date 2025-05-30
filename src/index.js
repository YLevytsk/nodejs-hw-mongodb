/* global process */
import dotenv from 'dotenv';
dotenv.config();

import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

process.on('uncaughtException', (err) => {
  console.error('❌ [uncaughtException] Неперехваченная ошибка:', err.message);
  console.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('❌ [unhandledRejection] Необработанный промис:', reason);
});

const bootstrap = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (err) {
    console.error('❌ Ошибка при запуске приложения:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
};

bootstrap();


