/* global process */
import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  const {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_URL,
    MONGODB_DB
  } = process.env;

  const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`;

  console.log('⏺️ Собранный MONGODB_URI:', uri);

  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Mongo connection error:', error.message);
    throw error;
  }
};




