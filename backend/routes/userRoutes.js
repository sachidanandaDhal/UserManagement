const express = require('express');
const { userLogin, setPassword } = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', userLogin);
router.post('/set-password', setPassword);

module.exports = router;
