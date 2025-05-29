import express from 'express';
import {
  fetchAllContacts,
  fetchContactById,
  createContact,  // импортируем новую функцию
} from '../controllers/contactsController.js';

const router = express.Router();

router.get('/', fetchAllContacts);
router.get('/:contactId', fetchContactById);
router.post('/', createContact);  // новый POST маршрут

export default router;

