const express = require('express');
const router = express.Router();
const store = require('../data/store');
const balanceService = require('../services/balanceService');
const { v4: uuidv4 } = require('uuid');

// View all balances (simplified)
router.get('/', (req, res) => {
    const allBalances = balanceService.simplifyBalances();
    res.json(allBalances);
});

// View balances for a specific user
router.get('/:userId', (req, res) => {
    const userBalances = balanceService.getUserBalances(req.params.userId);
    res.json(userBalances);
});

// Settle dues between two users
router.post('/settle', (req, res) => {
    const { from, to } = req.body;

    if (!store.balances[from] || !store.balances[from][to]) {
        return res.json({ message: 'No dues to settle' });
    }

    store.balances[from][to] = 0;
    res.json({ message: `Settlement completed between ${from} and ${to}` });
});

module.exports = router;
