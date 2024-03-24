const express = require("express");

//controller functions
const { signupUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// Login Router
router.post("/login", loginUser);

//SignUp Router
router.post("/signup", signupUser);

module.exports = router;
