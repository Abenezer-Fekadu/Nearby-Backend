// Imports
const express = require('express');
const router = express.Router();


// Controllers
const { getFoods, getFoodById, getFoodByName } = require('../controllers/food');
const { requireSignIn } = require('../controllers/auth');


// Routes
router.get('/foods', requireSignIn, getFoods);

router.get('/foods/:name', requireSignIn, getFoodByName);

router.get('/foods/:foodId', requireSignIn, (req, res) => {
    // const {_id, name, phone, location, motto, createdAt} = req.data
    res.status(200).json({
        food: req.data
            // food: {_id, name, phone, location, motto, createdAt} 
    });
});
router.param('foodId', getFoodById);

// Export
module.exports = router;