const db = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [exists] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (exists.length > 0) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashed]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
};

const getUser = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, email FROM users WHERE id = ?', [req.user.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user', error: err });
  }
};

module.exports = { registerUser, loginUser, getUser };
