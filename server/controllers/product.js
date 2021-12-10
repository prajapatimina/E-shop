const { Category } = require("../models/category")
const { validateProduct, Product, validateUpdateProduct } = require("../models/product")
const mongoose = require('mongoose')

exports.createProduct = async(req,res)=>{
    const {error, value:productReq} = validateProduct(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const {category:categoryId} = productReq
    console.log(categoryId)

    const category = await Category.findById(categoryId)
    if(!category) return res.status(400).send("Invalid Category")
    
   const file = req.file
   if(!file) return res.status(400).send("No image found")
   

fileName = req.file.filename
basePath = `${req.protocol}://${req.get('host')}/public/upload`
    product = new Product({
        ...productReq,
        image:`${basePath}${fileName}`
    })
   await product.save()
    if(!product) res.status(400).send("Product cannot be created")

    res.send(product)
    console.log('created',product)
}

exports.getAllProduct = async (req,res)=>{
    const product = await Product.find().populate('category')
    //get from last entry
    // .sort({"_id":-1})
    if(!product ) res.status(400).send("No Product Found")
    res.send(product)
}

exports.getByProductId = async(req,res)=>{
    const product = await Product.findById(req.params.id).populate('category')
    if(!product) res.status(200).send("Product with given id not found")
    res.send(product)
   
}

exports.updateProduct = async(req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send("Invalid Product Id")
    }
    const {error, value:updateReq} =validateUpdateProduct(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const {category:categoryId} = updateReq
    console.log(categoryId)

    const category = await Category.findById(categoryId)
    if(!category) return res.status(400).send("Invalid Category")
   

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {...updateReq},
        {new: true}
    )
    if(!product) return res.send("Product cannot be updated!")
    res.send({
        message:"Update Success",
        product:product
    })
}

exports.countProduct = async(req,res)=>{
    const productCount = await Product.countDocuments()
    if(!productCount)return res.send("No products")

    res.send({
        productCount:productCount
    })
}

exports.getFeaturedProduct = async (req,res)=>{
    const product = await Product.find({isFeatured: true})
    
    if(!product ) res.status(400).send("No Product Found")
    res.send(product)
}

exports.filterProduct = async (req,res)=>{
    let filter={}
    if(req.query.categories){
        filter={category: req.query.categories}
    }
    const product = await Product.find(filter)
    
    if(!product ) res.status(400).send("No Product Found")
    res.send(product)
}

exports.deleteProduct = async(req,res)=>{
    const product = await Product.findByIdAndRemove(req.params.id)
    if(product){
        return res.status(200).send({
            success:true,
            message:"Product with given Id is deleted",
            product:product
        })

    }
    else{
        res.status(400).send({
            success:false,
            message:"Product not found"
        })
    }
}