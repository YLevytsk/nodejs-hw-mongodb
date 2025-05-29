/* global process */
import dotenv from 'dotenv';
dotenv.config();

console.log('📄 Загружен index.js');

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
  console.log('🚀 Инициализация приложения...');
  try {
    await initMongoConnection();
    console.log('✅ Подключение к MongoDB прошло успешно');

    setupServer();
    console.log('✅ Сервер настроен и запущен');
  } catch (err) {
    console.error('❌ Ошибка при запуске приложения:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
};

bootstrap();


