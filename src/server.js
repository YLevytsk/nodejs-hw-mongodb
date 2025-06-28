import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pinoHttp from 'pino-http';
import cookieParser from 'cookie-parser';

import contactsRouter from './routers/contactsRouter.js';
import authRouter from './routers/auth.js';
import authenticate from './middlewares/authenticate.js'; // ⬅️ импорт авторизации

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(pinoHttp());

  // 🔓 Auth routes — открыты
  app.use('/auth', authRouter);

  // 🔐 Contacts routes — защищены
  app.use('/contacts', authenticate, contactsRouter);

  // Тестовый маршрут
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the contacts API' });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
};



