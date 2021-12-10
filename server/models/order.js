const mongoose = require("mongoose")
const Joi = require('joi-oid')

const orderSchema = new mongoose.Schema({
    orderItems:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        // required:true
    }],
    shippingAddress:{
        type:String,
        required:true
    },
   
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        "default":"pending"
    },
    totalPrice:{
        type:Number
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
   
},
{timestamps:true}
)
const Order = mongoose.model('Order', orderSchema)

function validateOrder(order) {
    const schema = Joi.object({
        // orderItems:Joi.objectId(),
        shippingAddress: Joi.string().required(),
        phone: Joi.string().max(10).regex(/(?:\+977[- ])?\d{2}-?\d{7,8}/).required().label('Phone number must be in 10 digit'),
        status: Joi.string(),
        totalPrice: Joi.number(),
        user: Joi.objectId()

    }) 
    return schema.validate(order)
    
}

exports.Order = Order
exports.validateOrder = validateOrder
