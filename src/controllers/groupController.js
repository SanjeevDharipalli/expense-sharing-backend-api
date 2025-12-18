const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');

exports.createGroup = (req, res) => {
  const { name, members } = req.body;

  const groupId = uuidv4();

  store.groups[groupId] = {
    id: groupId,
    name,
    members
  };

  members.forEach(m => {
    if (!store.balances[m]) {
      store.balances[m] = {};
    }
  });

  res.status(201).json(store.groups[groupId]);
};
