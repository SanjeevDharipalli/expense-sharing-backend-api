const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');
const { updateBalances } = require('../services/balanceService');

exports.addExpense = (req, res) => {
  const { groupId, paidBy, amount, splits } = req.body;
  const expenseId = uuidv4();

  const expense = { id: expenseId, groupId, paidBy, amount, splits };
  store.expenses[expenseId] = expense;

  updateBalances(expense);

  res.status(201).json(expense);
};
