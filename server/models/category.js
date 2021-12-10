const mongoose = require("mongoose")
const Joi = require("joi-oid")

const categorySchema =new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    icon:{
        type: String
    },
    image:{
        type: String
    }

} ,
{timestamps: true}
)

const Category = mongoose.model('Category', categorySchema)

function validateCategory(category) {
    const schema = Joi.object({
      name: Joi.string().required(),
      icon: Joi.string(),
    })
    return schema.validate(category, { stripUnknown: true })
  }

exports.Category = Category;
exports.validateCategory = validateCategory;