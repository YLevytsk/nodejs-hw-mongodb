// src/server.js
/* global process */

import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(express.json());

  // Роут для перевірки
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the contacts API' });
  });

  // Обробка 404
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
};
