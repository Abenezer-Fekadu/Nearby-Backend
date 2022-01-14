// Imports
const express = require('express');
const router = express.Router();


// Controllers
const { requireSignIn, signUp, login, logout } = require('../controllers/auth');

// Routes
router.post('/signup', signUp);

router.post('/login', login);

router.get('/logout', requireSignIn, logout)


// Export
module.exports = router;