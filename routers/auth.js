// The file for the authentication routes

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoekn");
const User = require("../model/User_model");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  // New user valifdation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check for duplicate user in the database
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(400).send(`A user with this email already exists`);

  // Create secure passwords
  const salt = await bcrypt.gentSalt(10);
  const hashPassowrd = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new User({
    name: req.body.name, // This data come from the request body
    email: req.body.email,
    password: hashPassowrd,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

// User login logic
router.post("/login", async (req, res) => {
  // New user login
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check for duplicate user in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send(`Login information are not provided correctly`);

  // Check the password is valid or not
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send(`Invalid password is entered`);

  // Create a token for active users
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("activeUser-token", token);

  res.send(`Welcome, login succeesful!`);
});

module.exports = router;
