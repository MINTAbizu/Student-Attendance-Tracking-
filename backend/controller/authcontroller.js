import User from '../model/usermodel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      msg: 'Login successful',
      token,
      user: userData,
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const verifyuser = async (req, res) => {
  res.status(200).json({
    user: req.user
  });   
};

export default {
  login,
  verifyuser
};