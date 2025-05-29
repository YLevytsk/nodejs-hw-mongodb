// src/db/initMongoConnection.js
/* global process */

import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

    const URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

    await mongoose.connect(URI);
    console.log('✅ Mongo connection successfully established!');
  } catch (err) {
    console.error('❌ Mongo connection error:', err.message);
    process.exit(1); // зупиняє процес, якщо помилка
  }
};

