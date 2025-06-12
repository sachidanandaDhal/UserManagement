const express = require('express');
const { adminLogin, createUser } = require('../controllers/adminController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', adminLogin);
router.post('/create-user', protect, createUser);

module.exports = router;
