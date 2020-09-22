// The file for the authentication routes

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/User_model");
const { registerValidation } = require("../validation");

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
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
