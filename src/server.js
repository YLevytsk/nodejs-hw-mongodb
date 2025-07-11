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

// Читаємо swagger.json
const swaggerJsonPath = path.join(__dirname, '../docs/swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerJsonPath, 'utf-8'));

// Роздаємо docs як статичну папку (опційно, щоб мати доступ до swagger.json через URL)
app.use('/docs', express.static(path.join(__dirname, '../docs')));

// Підключаємо Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(pinoHttp());

// Тут твої роутери, наприклад:
import contactsRouter from './routers/contactsRouter.js';
import authRouter from './routers/auth.js';
import authenticate from './middlewares/authenticate.js';

app.use('/auth', authRouter);
app.use('/contacts', authenticate, contactsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the contacts API' });
});

// Обробники помилок
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 300;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;






