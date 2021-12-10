const mongoose = require("mongoose")
const Joi = require("joi-oid")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
        default: ''
    },
    city:{
        type: String,
        default: ''
    },
    phone:{
        type: String,
        required: true,
        maxlength: 10
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    

})

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = Joi.object({
        name:Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        address: Joi.string(),
        city: Joi.string(),
        phone: Joi.string().max(10).regex(/(?:\+977[- ])?\d{2}-?\d{7,8}/).required().label('Phone number must be in 10 digit'),
        isAdmin: Joi.boolean()

    }) 
    return schema.validate(user)
    
}

function validateLogin(user) {
    const schema= Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
    return schema.validate(user)
    
}

exports.User = User
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;
