const { validateOrder, Order } = require("../models/order")
const { OrderItem } = require("../models/orderItem")

exports.createOrder = async(req,res)=>{
    
    console.log(req.body)
   let orderItemsIds =Promise.all(req.body.orderItems.map(async orderItem=>{
       let newOrderItem = new OrderItem({
           quantity: orderItem.quantity,
           product: orderItem.product
       })
       newOrderItem = await newOrderItem.save()
       let newId = newOrderItem._id
    return newId
   }))

let items = await orderItemsIds;
console.log(items,'i')

let totalPrices=await Promise.all( items.map(async (itemId)=>{
    let orderItem =await OrderItem.findById(itemId).populate('product', 'price')
    
    let total = orderItem.product.price * orderItem.quantity
    return total
}))
console.log(totalPrices)
const totalPrice = totalPrices.reduce((a,b)=>a+b,0)

    order = new Order({
        
        orderItems: items,
        shippingAddress: req.body.shippingAddress,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user
    })
   await order.save()
    if(!order) res.status(400).send("order cannot be created")

    res.send(order)
    // console.log('created',order)
}

exports.getAllOrder = async (req,res)=>{
    const order = await Order.find().populate('user','name').sort({'createdAt':-1})
    if(!order ) res.status(400).send("No Order Found")
    res.send(order)
}

exports.getOrderById = async (req,res)=>{
    const order = await Order.findById(req.params.id)
    .populate('user','name')
    .populate({
        path:'orderItems', populate:{
            path:'product', populate:'category'}
    })
    if(!order ) res.status(400).send("No Order Found")
    res.send(order)
}

exports.updateOrder = async(req,res)=>{
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status:req.body.status
        },
        {new:true}
    )
    res.send(order)
}

exports.deleteOrder = async(req,res)=>{
    const order = await Order.findById(req.params.id)
    const {orderItems} = order
    console.log(orderItems)

    const items = await OrderItem.deleteMany({ _id: orderItems })
    console.log(items)
    
    const deletedOrder = await Order.findByIdAndRemove(req.params.id)
    if(deletedOrder){
        return res.status(200).send({
            success:true,
            message:"order with given Id is deleted",
            deletedOrder
        })

    }
    else{
        res.status(400).send({
            success:false,
            message:"Order not found"
        })
    }
}

exports.getUserOrder = async (req,res)=>{
    const userOrder = await Order.find({user:req.params.userId}).populate({
        path:'orderItems', populate:{
            path:'product', populate:'category'}
    }).sort({'createdAt':-1})
    if(!userOrder ) res.status(400).send("No Order Found")
    res.send(userOrder)
}