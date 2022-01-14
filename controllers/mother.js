const {Mother} = require('../models/mother');
const {Food} = require('../models/food');



// Get All Mothers
async function getMothers (req, res) {
	// addFood("61ddc5a913053466147174a0");

    try{
        let mothers = await Mother.find().select('name phone motto location foods');
        if (mothers.length == 0) {
            return res.status(404).json({
                msg: 'There Are No Mother Bets'
            })
        }
        
        res.status(200).send(mothers);
    }catch(err){
        res.status(400).json({msg: "Internal Server Error"});
    }
};


// Get Mother by ID
async function getMotherById(req, res, next, id){
    let mother = await Mother.findById(id).select('name phone location motto foods');
    if (!mother) {
        return res.status(404).json({
            msg: 'Mother not found'
        })
    }
	// Get all Foods for the mother
	// let foods = await Food.find({mother: id}).select('name price image description ingredient');
    // if (foods.length > 0) {

    //     mother.foods = foods;
    // }else{

	// 	mother.foods = []
	// }
    req.data = mother;
    next();
} 



async function addFood(id){
	
	food = new Food(
		{
			"mother": id,
			"name":"Misir",
			"price": 45,
			"image":"images/misr5.jpg",
			"ingredient": [
				"misir",
				"berbere",
				"onions",
				"bacon"
			] 
		}
	);

	await food.save()

	const mother = await Mother.findById(id);
	mother.foods.push(food);
	mother.save();
};






exports.getMothers = getMothers;
exports.getMotherById = getMotherById;
