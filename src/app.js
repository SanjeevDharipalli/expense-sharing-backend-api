const express = require('express');
const groupRoutes = require('./routes/groupRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const settlementRoutes = require('./routes/settlementRoutes');

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Expense Sharing Backend API is running');
});

app.use('/groups', groupRoutes);
app.use('/expenses', expenseRoutes);
app.use('/settlements', settlementRoutes);

module.exports = app;
