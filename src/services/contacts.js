import { Contact } from '../models/contactModel.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
};


export const addContact = async (contactData) => {
  const contact = new Contact(contactData);
  return await contact.save();
};


