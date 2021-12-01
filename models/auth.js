
const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')


const authSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
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
            default: 0
        },
    }, 
    {timestamp: true}
);


authSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuidv1()


    this.hashedPassword = this.encryptPassword(password)
})
.get(function(){
    return this._password
})


authSchema.methods = {
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


module.exports = mongoose.model('Auth', authSchema);