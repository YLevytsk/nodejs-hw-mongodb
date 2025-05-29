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

  
  app.use(cors());
  app.use(express.json());

  
  app.use(pinoHttp());

  
  console.log('🔁 Подключаю contactsRouter...');
  app.use('/contacts', contactsRouter);
  console.log('✅ contactsRouter подключён');

  
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the contacts API' });
  });

  
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

 
  app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
  });
};


