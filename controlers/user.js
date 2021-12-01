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


exports.userById = userById;
