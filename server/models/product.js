const mongoose = require("mongoose");
const Joi = require("joi-oid")

const productSchema =mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type:String
    },
    images:[{
        type: String
    }],
    brand:{
        type: String,
        default: ''

    },
    price:{
        type: Number,
        default: 0

    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true

    },
    countInStock:{
        type:Number,
        min: 0,
        max:255
    },
    isFeatured:{
        type:Boolean,
        default: false
    }

},
{timestamps: true}
)

const Product = mongoose.model('Product', productSchema)

function validateProduct(product) {
    const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    brand:Joi.string(),
    price: Joi.number(),
    category: Joi.objectId(),
    countInStock: Joi.number(),
    isFeatured: Joi.boolean()
    })
    return schema.validate(product)
    
}

function validateUpdateProduct(product) {
    const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    brand:Joi.string(),
    price: Joi.number(),
    category: Joi.objectId(),
    countInStock: Joi.number(),
    isFeatured: Joi.boolean()
    })
    return schema.validate(product)
    
}

exports.Product = Product;
exports.validateProduct = validateProduct;
exports.validateUpdateProduct =validateUpdateProduct