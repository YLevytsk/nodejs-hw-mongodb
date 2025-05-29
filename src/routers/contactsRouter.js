import express from 'express';
import {
  fetchAllContacts,
  fetchContactById,
} from '../controllers/contactsController.js';

const router = express.Router();

// GET /contacts — получить все контакты
router.get('/', fetchAllContacts);

// GET /contacts/:contactId — получить контакт по ID
router.get('/:contactId', fetchContactById);

export default router;

