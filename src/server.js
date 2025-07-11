import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pinoHttp from 'pino-http';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Глобальные обработчики ошибок
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

// Читаем swagger.json
const swaggerJsonPath = path.join(__dirname, '../docs/swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerJsonPath, 'utf-8'));

// Раздаем docs как статичную папку (опционально, чтобы получить доступ к swagger.json по URL)
app.use('/docs', express.static(path.join(__dirname, '../docs')));

// Подключаем Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(pinoHttp());

// Роуты
import contactsRouter from './routers/contactsRouter.js';
import authRouter from './routers/auth.js';
import authenticate from './middlewares/authenticate.js';

app.use('/auth', authRouter);
app.use('/contacts', authenticate, contactsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the contacts API' });
});

// Обработчики ошибок
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

app.use(notFoundHandler);
app.use(errorHandler);

export default app;






