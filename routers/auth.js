// The file for the authentication routes

const router = require("express").Router();

router.post("/register", (req, res) => {
  res.send("Registeration");
});

module.exports = router;
