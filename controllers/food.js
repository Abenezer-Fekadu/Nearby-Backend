const {Food} = require('../models/food');
const {Mother} = require('../models/mother');


// Get All Mothers
async function getFoods (req, res) {

    try{
        let foods = await Food.find().populate('mother', 'name').select('mother name price image description ingredient').limit(20);
        if (foods.length == 0) {
            return res.status(404).json({
                msg: 'There Are No Foods'
            })
        }
        res.status(200).send(foods);
    }catch(err){
        res.status(400).json({msg: "Internal Server Error"});
    }
};


// Get Foods by ID
async function getFoodById(req, res, next, id){

    let food = await Food.findById(id).populate('mother', 'name').select('mother name price image description ingredient');
    if (!food) {
        return res.status(404).json({
            msg: 'Food not found'
        })
    }

    req.data = food;
    next();
} 

// Get Food By Name
async function getFoodByName (req, res) {
    const { name } = req.params;
    try{
    let mothers = await Mother.find({ "foods.name": { $regex: name }})
        .find(
            {
                location: {
                    $near: {
                    $maxDistance: 200,
                    $geometry: {
                        type: "Point",
                        coordinates: [9.039874, 38.762880]
                            }
                        }
                    }
                }
        ).select({name:1, phone:1, location:1, motto:1, foods:1 }).select({"foods.name" : 1, "foods.price":1 });
        if (mothers.length == 0) {
            return res.status(404).json({
                msg: 'There Are No mother'
            })
        }
        res.status(200).send(mothers);

    }catch(err){
        res.status(400).json({msg: err});

    }

};



exports.getFoods = getFoods;
exports.getFoodById = getFoodById;
exports.getFoodByName = getFoodByName;
