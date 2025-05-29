// src/db/initMongoConnection.js
/* global process */

// src/db/initMongoConnection.js

import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  const { MONGODB_URI } = process.env;

  console.log('⏺️ MONGODB_URI:', MONGODB_URI); // можно оставить для отладки

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Mongo connection error:', error.message);
    throw error;
  }
};



