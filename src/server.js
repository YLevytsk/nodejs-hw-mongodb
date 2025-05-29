/* global process */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pinoHttp from 'pino-http';

import contactsRouter from './routers/contactsRouter.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  console.log('🚀 Запуск сервера...');

  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Простое логирование запросов
  app.use(pinoHttp());

  // Проверка маршрутов
  console.log('🔁 Подключаю contactsRouter...');
  app.use('/contacts', contactsRouter);
  console.log('✅ contactsRouter подключён');

  // Корневой маршрут
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the contacts API' });
  });

  // Обработка несуществующих маршрутов
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
  });
};


