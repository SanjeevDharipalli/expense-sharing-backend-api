const store = require('../data/store');

exports.updateBalances = ({ paidBy, splits }) => {
  splits.forEach(({ userId, share }) => {


    if (!store.balances[userId]) {
      store.balances[userId] = {};
    }

    
    if (!store.balances[userId][paidBy]) {
      store.balances[userId][paidBy] = 0;
    }

    
    if (userId === paidBy) return;

    store.balances[userId][paidBy] += share;
  });
};
