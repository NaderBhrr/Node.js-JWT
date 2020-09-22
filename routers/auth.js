// The file for the authentication routes

const router = require("express").Router();
const User = require("../model/User_model");

router.post("/register", async (req, res) => {
  // Data should be validated before adding new users
  const { error } = Joi.validate(req.body, schema);

  return error ? res.status(400).send(error.details[0].message) : null;

  const user = new User({
    name: req.body.name, // This data come from the request body
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
