const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Check if user needs to set password
    if (!user.isPasswordSet) {
      return res.json({ message: 'SET_PASSWORD', userId: user._id });
    }

    // Send token
    res.json({ token: generateToken(user._id) });
  } catch (error) {
    console.error('User login error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};

const setPassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    // Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);

    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashed, isPasswordSet: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Password set successfully' });
  } catch (error) {
    console.error('Set password error:', error.message);
    res.status(500).json({ message: 'Server error while setting password' });
  }
};

module.exports = { userLogin, setPassword };
