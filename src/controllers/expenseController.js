const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');
const balanceService = require('../services/balanceService'); 

exports.addExpense = (req, res) => {
    const { groupId, paidBy, amount, splitType, splits } = req.body;

    if (!['equal', 'exact', 'percentage'].includes(splitType)) {
        return res.status(400).json({ error: 'Invalid split type' });
    }

    let finalSplits = [];

    if (splitType === 'equal') {
        const share = amount / splits.length;
        finalSplits = splits.map(user => ({ userId: user, share }));
    }

    if (splitType === 'exact') {
        const total = splits.reduce((s, x) => s + x.share, 0);
        if (total !== amount) {
            return res.status(400).json({ error: 'Exact split mismatch' });
        }
        finalSplits = splits;
    }

    if (splitType === 'percentage') {
        const totalPercent = splits.reduce((s, x) => s + x.percentage, 0);
        if (totalPercent !== 100) {
            return res.status(400).json({ error: 'Percentages must sum to 100' });
        }
        finalSplits = splits.map(s => ({
            userId: s.userId,
            share: (amount * s.percentage) / 100
        }));
    }

    const expense = {
        id: uuidv4(),
        groupId,
        paidBy,
        amount,
        splitType,
        splits: finalSplits
    };

    store.expenses[expense.id] = expense;
    balanceService.updateBalances(expense);

    res.status(201).json(expense);
};
