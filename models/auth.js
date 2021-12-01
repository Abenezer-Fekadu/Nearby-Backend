const Joi = require('joi')
const mongoose = require('mongoose')
const crypto = require('crypto')
const {v4: uuidv4} = require('uuid')


const authSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
            minlength: 2,
            maxlength:32,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
            minlength: 2,
            maxlength:32,
        },
        email: { 
            type: String,
            trim: true,
            required: true,
            unique: 32,
        },
        hashedPassword: {
            type: String,
            required: true,
        },
        salt: String,
        roles: {
            type: Number,
            enum: [0,1],
            default: 0
        },
    },
    {timestamps: true}
);


authSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuidv4()


    this.hashedPassword = this.encryptPassword(password)
})
.get(function(){
    return this._password
})


authSchema.methods = {
    authenticate: function(txt){
        return this.encryptPassword(txt) === this.hashedPassword; 
    },
    encryptPassword: function(password){
        if(!password) return "";
        try{
            return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
        }
        catch(err){
            return "";
        }
    }
}


function validateUserSignup(user){
    const schema = Joi.object({
        firstName: Joi.string()
            .min(3)
            .max(30)
            .required(),
        lastName: Joi.string()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
    });
    return schema.validate(user)

}
function validateUserSignIn(user){
    const schema = Joi.object({
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
    });
    return schema.validate(user)

}



exports.signupValidate = validateUserSignup;
exports.loginValidate = validateUserSignIn;

exports.User = mongoose.model('User', authSchema);