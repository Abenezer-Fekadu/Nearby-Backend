// Imports
const express = require('express');
const router = express.Router();


// Controllers
const { getMothers, getMotherById } = require('../controllers/mother');
const { requireSignIn } = require('../controllers/auth');


// Routes
router.get('/mothers', requireSignIn, getMothers);

router.get('/mothers/:motherId', requireSignIn, (req, res) => {
    res.status(200).json({
        mother: req.data
    });
});
router.param('motherId', getMotherById);



// Export
module.exports = router;