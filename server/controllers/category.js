const {  Category, validateCategory } = require("../models/category")

exports.createCategory = async(req,res)=>{
    const {error, value:categoryReq} = validateCategory(req.body)
    if(error) return res.status(400).sens(error.details[0].message)

    category = new Category({
        ...categoryReq
    })
   await category.save()
    if(!category) res.status(400).send("Category cannot be created")

    res.send(category)
    console.log('created',category)
}

exports.getAllCategory = async (req,res)=>{
    const category = await Category.find()
    if(category ) res.status(200).send(category)
}

exports.getByCategoryId = async(req,res)=>{
    const category = await Category.findById(req.params.id)
    if(!category) res.status(200).send("Category with given id not found")
    res.send(category)
   
}

exports.updateCategory = async(req,res)=>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            icon: req.body.icon
        },
        {new:true}
    )
    res.send(category)
}

exports.delete = async(req,res)=>{
    const category = await Category.findByIdAndRemove(req.params.id)
    if(category){
        return res.status(200).send({
            success:true,
            message:"Category with given Id is deleted",
            category
        })

    }
    else{
        res.status(400).send({
            success:false,
            message:"Category not found"
        })
    }
}