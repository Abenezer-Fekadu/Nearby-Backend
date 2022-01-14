const Joi = require('joi')
const mongoose = require('mongoose')

const { foodSchema } = require('./food');



const motherSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            minlength: 2,
            maxlength:32,
        },
        phone: {
            type: String,
            trim: true,
            required: true,
            minlength: 10,
            maxlength:12,
        },
        motto: { 
            type: String,
            trim: true,
            required: true,
        },
        location: {
            type: {
              type: String, // Don't do `{ location: { type: String } }`
              enum: ['Point'], // 'location.type' must be 'Point'
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            },
        },
        foods: [foodSchema], 
    },
    {timestamps: true}
);

motherSchema.index({ location: '2dsphere' });

function validateMotherSignup(mother){
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),
        phone: Joi.string()
            .length(10)
            .pattern(/^[0-9]+$/)
            .required(),
        motto: Joi.string()
            .min(3)
            .max(30)
            .required(),
    });
    return schema.validate(mother)

}

function validateMotherSignIn(mother){
    const schema = Joi.object({
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
    });
    return schema.validate(mother)

}



// exports.signupValidate = validateUserSignup;
// exports.loginValidate = validateUserSignIn;

exports.Mother = mongoose.model('Mother', motherSchema);