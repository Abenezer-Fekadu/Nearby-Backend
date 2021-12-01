// Imports
const {User, signupValidate, loginValidate }= require('../models/auth');
// const { errorHandler } = require('../handlers/errorHandler')
const jwt = require('jsonwebtoken');    // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check  



// Functions
async function signUp (req, res) {
    // Validate the user
    const { error } = signupValidate(req.body);
    if (error)  return res.status(400).json({ msg: error.details[0].message });

    // Check if the user exists
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({msg: "User Already Exists"}); 

    // Save User
    user = new User(req.body);
    await user.save()

    user.salt = undefined
    user.hashedPassword = undefined
    res.send(user);
}


async function login(req, res) {
    // Validate the user
    const { error } = loginValidate(req.body);
    if (error)  return res.status(400).json({ msg: error.details[0].message });
    
    // Get User
    const { email, password } = req.body;

    // check User
    let user = await User.findOne({email});
    if (!user) return res.status(400).json({msg: "User Doesn\'t Exists"}); 

    if (!user.authenticate(password)){
        return res.status(400).json({
            msg: "Email and Password don\'t match"
        })
    }
    // Generate Token
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

    res.cookie('t', token, {expire: new Date() + 9999})


    const {_id, firstName, lastName, roles} = user

    return res.json({
        token,
        user: {_id, firstName, lastName, email, roles}

    })
}


async function logout(req, res) {
    res.clearCookie('t');
    res.json({
        msg: "Logout Successful"
    })

}



// module.exports.signUp = (req, res) => {
        // const user = new User(req.body);
    // user.save((err, user) => {
    //     if(err){
    //         return res.status(400).json({
    //             err: errorHandler(err)
    //         });
    //     }
    //     user.salt = undefined
    //     user.hashedPassword = undefined
    //     res.json({
    //       user
    //     });
    // });
// }

exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
});


exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user){
        return res.status(403).json({
            msg: "Access Denied"
        })
    }

    next();
}
exports.isAdmin = (req, res, next) => {
    if(req.profile.roles === 0){
        return res.status(403).json({
            msg: "Admin Resource: Access Denied"
        })
    }

    next();
}





exports.signUp = signUp;
exports.login = login;
exports.logout = logout;