const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Create a new expense
router.post('/api/expenses', async (req, res) => {
  try {
    const { text, amount } = req.body;
    const expense = new Expense({ text, amount });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all expenses
router.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an expense by ID
router.patch('/api/expenses/:id', async (req, res) => {
  try {
    const { text, amount } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, { text, amount }, { new: true, runValidators: true });
    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an expense by ID
router.delete('/api/expenses/:id', async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(deletedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
