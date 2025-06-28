import Contact from '../models/contactModel.js';

export const getAllContacts = async (userId) => {
  return await Contact.find({ userId });
};

export const getContactById = async (id, userId) => {
  return await Contact.findOne({ _id: id, userId });
};

export const addContact = async (contactData) => {
  const contact = new Contact(contactData);
  return await contact.save();
};

export const removeContact = async (id, userId) => {
  return await Contact.findOneAndDelete({ _id: id, userId });
};

export const updateContact = async (id, updateData, userId) => {
  return await Contact.findOneAndUpdate({ _id: id, userId }, updateData, {
    new: true,
  });
};

export const patchContact = async (id, updateData, userId) => {
  return await Contact.findOneAndUpdate({ _id: id, userId }, updateData, {
    new: true,
  });
};



