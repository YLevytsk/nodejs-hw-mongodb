import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Делаем dotenv первым делом!
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// >>> Диагностика: показываем содержимое .env и переменные из process.env
import fs from 'fs';
console.log('Содержимое .env:\n', fs.readFileSync(path.resolve(__dirname, '../.env'), 'utf-8'));
console.log('process.env.JWT_ACCESS_SECRET:', process.env.JWT_ACCESS_SECRET);
console.log('process.env.JWT_REFRESH_SECRET:', process.env.JWT_REFRESH_SECRET);

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




