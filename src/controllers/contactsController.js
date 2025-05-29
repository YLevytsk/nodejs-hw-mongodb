import { getAllContacts, getContactById, addContact } from '../services/contacts.js';

export const fetchAllContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error('❌ Error fetching contacts:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const fetchContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.error('❌ Error fetching contact by ID:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createContact = async (req, res) => {
  try {
    const newContactData = req.body;
    const newContact = await addContact(newContactData);

    res.status(201).json({
      status: 201,
      message: 'Contact created successfully!',
      data: newContact,
    });
  } catch (error) {
    console.error('❌ Error creating contact:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


