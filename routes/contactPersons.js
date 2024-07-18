const express = require('express');
const router = express.Router();
const ContactPerson = require('../models/contactPersonModel');

// Middleware to get ContactPerson by ID
async function getContactPerson(req, res, next) {
    let contactPerson;
    try {
        contactPerson = await ContactPerson.findById(req.params.id);
        if (!contactPerson) {
            return res.status(404).json({ message: 'Contact person not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.contactPerson = contactPerson;
    next();
}

// Getting all ContactPersons
router.get('/', async (req, res) => {
    try {
        const contactPersons = await ContactPerson.find();
        res.json(contactPersons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One ContactPerson
router.get('/:id', getContactPerson, (req, res) => {
    res.json(res.contactPerson);
});

// Creating One ContactPerson
router.post('/', async (req, res) => {
    const { name, email, phone_number } = req.body;

    // Validate that required fields are provided
    if (!name || !email || !phone_number) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newContactPerson = new ContactPerson({
        name,
        email,
        phone_number
    });

    try {
        const savedContactPerson = await newContactPerson.save();
        res.status(201).json(savedContactPerson);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One ContactPerson
router.patch('/:id', getContactPerson, async (req, res) => {
    const { name, email, phone_number } = req.body;

    // Validate that at least one field is provided for update
    if (!name && !email && !phone_number) {
        return res.status(400).json({ message: 'Please provide at least one field to update' });
    }

    try {
        if (name) {
            res.contactPerson.name = name;
        }
        if (email) {
            res.contactPerson.email = email;
        }
        if (phone_number) {
            res.contactPerson.phone_number = phone_number;
        }

        const updatedContactPerson = await res.contactPerson.save();
        res.json(updatedContactPerson);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One ContactPerson
router.delete('/:id', getContactPerson, async (req, res) => {
    try {
        await res.contactPerson.remove();
        res.json({ message: 'Contact person deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
