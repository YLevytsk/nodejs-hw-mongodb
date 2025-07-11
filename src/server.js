import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pinoHttp from 'pino-http';
import cookieParser from 'cookie-parser';

import contactsRouter from './routers/contactsRouter.js';
import authRouter from './routers/auth.js';
import authenticate from './middlewares/authenticate.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

// === Swagger docs ===
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// SWAGGER docs (шлях до docs/openapi.yaml)
const swaggerDocument = YAML.load(path.join(__dirname, '../docs/openapi.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// === Інші middleware ===
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(pinoHttp());

// === Роути ===
app.use('/auth', authRouter);
app.use('/contacts', authenticate, contactsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the contacts API' });
});

// === Error handlers ===
app.use(notFoundHandler);
app.use(errorHandler);

export default app;





