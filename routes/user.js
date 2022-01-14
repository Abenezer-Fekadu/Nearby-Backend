
// Imports
const express = require('express');
const router = express.Router();


// Controllers
const { userById, getUsers } = require('../controllers/user');
const { requireSignIn, isAuth } = require('../controllers/auth');



// Routes
router.get('/users', requireSignIn,  getUsers);

router.get('/users/:userId', requireSignIn, isAuth, (req, res) => {
    const {_id, username, email, phone, createdAt, roles} = req.profile
    res.status(200).json({
        user: {_id, username, email, phone, roles, createdAt}
    });
});
router.param('userId', userById);


// Export
module.exports = router;