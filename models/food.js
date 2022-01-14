const Joi = require('joi')
const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema(
    {
        mother: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mother',
            required: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
            minlength: 2,
            maxlength:32,
        },
        price: {
            type: Number,
            required: true,
        },
        image: { 
            type: String,
            trim: true,
            required: true,
            minlength: 10,
        },
        ingredient: {
            type: [String],
            required: true
        },
    },
    {timestamps: true}
);

exports.foodSchema = foodSchema;
exports.Food = mongoose.model('Food', foodSchema);