const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const sendPasswordEmail = require('../utils/mailer');

const adminLogin = async (req, res) => {
  try {
    const { id, password } = req.body;
    if (id === 'knox' && password === 'knox') {
      return res.json({ token: generateToken('admin') });
    }
    res.status(401).json({ message: 'Invalid admin credentials' });
  } catch (error) {
    console.error('Admin login error:', error.message);
    res.status(500).json({ message: 'Server error during admin login' });
  }
};

const createUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const user = await User.create({ email, password: hashedPassword });
    await sendPasswordEmail(email, tempPassword);

    res.status(201).json({ message: 'User created & password sent via email' });
  } catch (error) {
    console.error('User creation error:', error.message);
    res.status(500).json({ message: 'Server error during user creation' });
  }
};

module.exports = { adminLogin, createUser };
