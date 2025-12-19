const store = require('../data/store');

exports.settleUp = (req, res) => {
  const { from, to } = req.body;

  if (!store.balances[from] || !store.balances[from][to]) {
    return res.json({ message: 'No dues to settle' });
  }

  store.balances[from][to] = 0;

  res.json({ message: `Settlement completed between ${from} and ${to}` });
};
