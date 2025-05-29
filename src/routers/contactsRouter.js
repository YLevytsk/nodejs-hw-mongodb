import express from 'express';
import {
  fetchAllContacts,
  fetchContactById,
  createContact, 
} from '../controllers/contactsController.js';

const router = express.Router();

router.get('/', fetchAllContacts);
router.get('/:contactId', fetchContactById);
router.post('/', createContact);  

export default router;

