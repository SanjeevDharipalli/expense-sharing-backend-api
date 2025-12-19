const store = require('../data/store');

exports.updateBalances = (expense) => {
    expense.splits.forEach(({ userId, share }) => {
        if (userId === expense.paidBy) return;

        if (!store.balances[userId]) store.balances[userId] = {};
        if (!store.balances[userId][expense.paidBy]) {
            store.balances[userId][expense.paidBy] = 0;
        }

        store.balances[userId][expense.paidBy] += share;
    });
};

exports.getBalances = () => store.balances;

exports.getUserBalances = (userId) => store.balances[userId] || {};

exports.simplifyBalances = () => {
    const simplified = {};

    for (let u1 in store.balances) {
        for (let u2 in store.balances[u1]) {
            const amount = store.balances[u1][u2];
            if (amount === 0) continue;

            if (!simplified[u1]) simplified[u1] = {};
            if (!simplified[u2]) simplified[u2] = {};

            if (simplified[u2][u1]) {
                if (simplified[u2][u1] > amount) {
                    simplified[u2][u1] -= amount;
                } else {
                    simplified[u1][u2] = amount - simplified[u2][u1];
                    delete simplified[u2][u1];
                }
            } else {
                simplified[u1][u2] = amount;
            }
        }
    }

    for (let user in simplified) {
        if (Object.keys(simplified[user]).length === 0) delete simplified[user];
    }

    return simplified;
};
