import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Делаем dotenv первым делом!
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Дальше — только остальные импорты
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



