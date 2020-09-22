// Validation logic
const Joi = require("@hapi/joi");

// Register validation function
const registerValidation = (newUserData) => {
  const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };

  return Joi.validate(newUserData, schema);
};

const loginValidation = (newUserData) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
