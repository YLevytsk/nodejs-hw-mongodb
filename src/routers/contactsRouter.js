import express from 'express';

import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
  patchContactController,
} from '../controllers/contactsController.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import authenticate from '../middlewares/authenticate.js'; 

import {
  addContactSchema,
  updateContactSchema,
} from '../validation/contactsSchemas.js';

const router = express.Router();


router.use(authenticate);


router.get('/', ctrlWrapper(getAllContactsController));


router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));


router.post(
  '/',
  validateBody(addContactSchema),
  ctrlWrapper(createContactController)
);


router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));


router.put(
  '/:contactId',
  isValidId,
  validateBody(addContactSchema),
  ctrlWrapper(updateContactController)
);


router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController)
);

export default router;








