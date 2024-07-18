const express = require('express');
const ActionItem = require('../models/actionItemModel');
const router = express.Router();

// Getting all ActionItems
router.get('/', async (req, res) => {
  try {
    const actionItems = await ActionItem.find();
    res.json(actionItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One ActionItem
router.get('/:id', getActionItem, (req, res) => {
  res.json(res.actionItem);
});

// Creating One ActionItem
router.post('/', async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  if (!title || !description || !dueDate || !status) {
    return res.status(400).json({ message: 'Please add all fields' });
  }

  const actionItem = new ActionItem({
    title,
    description,
    dueDate,
    status
  });

  try {
    const newActionItem = await actionItem.save();
    res.status(201).json(newActionItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One ActionItem
router.patch('/:id', getActionItem, async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  if (title != null) {
    res.actionItem.title = title;
  }
  if (description != null) {
    res.actionItem.description = description;
  }
  if (dueDate != null) {
    res.actionItem.dueDate = dueDate;
  }
  if (status != null) {
    res.actionItem.status = status;
  }

  try {
    const updatedActionItem = await res.actionItem.save();
    res.json(updatedActionItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One ActionItem
router.delete('/:id', getActionItem, async (req, res) => {
  try {
    await res.actionItem.remove();
    res.json({ message: 'Deleted ActionItem' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get ActionItem by ID
async function getActionItem(req, res, next) {
  let actionItem;
  try {
    actionItem = await ActionItem.findById(req.params.id);
    if (actionItem == null) {
      return res.status(404).json({ message: 'Cannot find ActionItem' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.actionItem = actionItem;
  next();
}

module.exports = router;
