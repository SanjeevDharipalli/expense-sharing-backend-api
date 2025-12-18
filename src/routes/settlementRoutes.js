const express = require('express');
const { settleUp } = require('../controllers/settlementController');


const router = express.Router();
router.post('/', settleUp);


module.exports = router;