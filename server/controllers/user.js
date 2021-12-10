const { validateUser, User, validateLogin } = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
require('dotenv/config')

exports.createUser = async(req,res)=>{
    const {error, value:userReq}= validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const {email, password}= userReq

    const user = await User.findOne({email})
    if(user) return res.send("User already exists")

    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password,salt)

    const newUser = new User({
        ...userReq,
        password: hashedPassword
    })
    await newUser.save();
    
    res.send(newUser)


}
exports.getAllUser = async (req,res)=>{
    const user = await User.find().select('-password')
    if(!user ) res.status(400).send("No User Found")
    res.send(user)
}

exports.getByUserId = async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password')
    if(!user) res.status(200).send("User with given id not found")
    res.send(user)
   
}

exports.login = async(req,res)=>{
    const {error, value:loginReq}= validateLogin(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const {email, password}= loginReq

    const user = await User.findOne({email})
    if(!user) return res.status(400).send("Invalid user or password")

    let validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword) return res.status(400).send("Invalid email or password")

    let token = jwt.sign({userId :user._id},process.env.jwt_secret,{expiresIn:'1d'})
    res.send({user, token:token})
}