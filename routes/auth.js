// Imports
const express = require('express');
const router = express.Router();


// Controllers
const { requireSignIn, signUp, login, logout } = require('../controlers/auth');


// Validators
// const { signupValidator} = require('../validators')


// Routes
router.post('/signup', signUp);

router.post('/login', login);

router.get('/logout', logout)


// Export
module.exports = router;