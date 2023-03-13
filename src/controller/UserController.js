const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const authController = {
  registerUser: async (req, res) => {
    // const { username, password, email } = req.body;
    const firstName = req.body.firstName.trim();
    const lastName = req.body.lastName.trim();
    const username = req.body.username.trim();
    const email = req.body.email.trim();
    const password = req.body.password;
    if (firstName && lastName && username && email && password) {
      try {
        const newUser = await new User({
          firstName, lastName, username, email, password
        })
        if (!newUser.checkEmail()) {
          return res.status(400).render("/register", { message: "Username or email already use" })
        }
        const userExists = await User.findOne().checkUserExists(username, email);
        if (userExists) {
          return res.status(400).render("/register", { message: "Username or email already use" })
        }
        await newUser.hashPassword();
        const user = await newUser.save();
        return res.redirect('/login')
      } catch (err) {
        console.log(err)
      }
    }
  },
  getloginUser: async (req, res) => {
    return res.render('Login.ejs')
  },
  getRegister: async (req, res) => {
    return res.render('register.ejs')
  },
  loginUser: async (req, res) => {
    const { username, password } = req.body;
    const secret_key = "twitter"
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" })
    const result = await bcrypt.compare(password, user.password);
    if (!result) return res.status(404).json({ message: 'Invalid credentials' });
    req.session.user = user;
    const token = jwt.sign({ id: user._id }, secret_key, { expiresIn: '1h' });
    return res.status(200).json(token);
  }
}

module.exports = authController;