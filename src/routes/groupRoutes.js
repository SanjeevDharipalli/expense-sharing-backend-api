const express = require('express');
const { createGroup } = require('../controllers/groupController');


const router = express.Router();
router.post('/', createGroup);


module.exports = router;