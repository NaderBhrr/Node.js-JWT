const jwt = require("jsonwebtoken");

// Create the middleware for the current active user
const verifyActiveUser = (req, res, next) => {
  const token = req.header("activeUser-token");
  if (!toekn)
    return res.status(401).send(`Sorry, You are not given access to this page`);

  try {
    const verifiedActivity = jwt.verify(token, proces.env.TOKEN_SECRET);
    req.user = verifiedActivity;
    next();
  } catch (error) {
    res.status(400).send(`The token is not valid or is expired`);
  }
};

module.exports = verifyActiveUser;
