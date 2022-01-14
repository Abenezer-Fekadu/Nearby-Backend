const {User} = require('../models/auth');



async function userById(req, res, next, id){

    let user = await User.findById(id);
    if (!user) {
        return res.status(404).json({
            msg: 'User not found'
        })
    }

    req.profile = user;
    next();
} 

async function getUsers(req, res){

    try{
        let users = await User.find().select('username phone email createdAt');
        if (users.length == 0) {
            return res.status(404).json({
                msg: 'There Are No User'
            })
        }
        res.status(200).send(users);
    }catch(err){
        res.status(400).json({msg: "Internal Server Error"});
    }

} 


exports.userById = userById;
exports.getUsers = getUsers;
