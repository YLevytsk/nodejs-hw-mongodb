import Contact from '../models/contactModel.js';

// Головна зміна — Додаємо userId в filter у контролері, цей сервіс очікує правильний filter!

export const getAllContacts = async ({
  filter = {},
  skip = 0,
  limit = 10,
  sortBy = 'name',
  sortOrder = 'asc',
}) => {
  const sortCriteria = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

  // тут Contact.find(filter) — filter повинен містити userId!
  const [contacts, totalItems] = await Promise.all([
    Contact.find(filter).sort(sortCriteria).skip(skip).limit(limit),
    Contact.countDocuments(filter),
  ]);

  return { contacts, totalItems };
};

export const getContactById = async (id, userId) => {
  return Contact.findOne({ _id: id, userId });
};

export const addContact = async (contactData) => {
  // contactData має містити userId!
  const contact = new Contact(contactData);
  return contact.save();
};

export const removeContact = async (id, userId) => {
  return Contact.findOneAndDelete({ _id: id, userId });
};

export const updateContact = async (id, userId, updateData) => {
  return Contact.findOneAndUpdate({ _id: id, userId }, updateData, { new: true });
};

export const patchContact = async (id, userId, updateData) => {
  return Contact.findOneAndUpdate({ _id: id, userId }, updateData, { new: true });
};






