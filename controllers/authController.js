const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  const { nom, prenom, mail, mot_passe, role } = req.body;
  console.log('Received data:', req.body); // Log the received data

  try {
    const user = new User({ nom, prenom, mail, mot_passe, role });
    console.log('New user object:', user); // Log the user object before saving
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration error:', error); // Log any errors that occur during registration
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { mail, mot_passe } = req.body;
  try {
    const user = await User.findOne({ mail });
    if (!user || !(await user.matchPassword(mot_passe))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, updateUser, deleteUser };
