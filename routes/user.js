
// Imports
const express = require('express');
const router = express.Router();


// Controllers
const { userById } = require('../controlers/user');
const { requireSignIn, isAuth, isAdmin } = require('../controlers/auth');



// Routes
router.get('/secret/:userId', requireSignIn,isAuth, isAdmin, (req, res) => {
    res.json({
        msg: req.profile
    });
});

router.param('userId', userById);


// Export
module.exports = router;