const orderModel = require('../../Model/Order/OrderModel')

//Get all orders
const getAllOrders = async (req , res) => {
    const orders = await orderModel.find({}).sort({createdAt:-1})
    res.status(200).json(orders)
}


//Get one order
const getOrderById = async (req , res) => {
    const { id } = req.params 

    const orders = await orderModel.findById(id)

    if(!orders){
        return res.status(404).json({error:"No Such Orders"})
    }

    res.status(200).json(orders)
}

//Post New Order
const PostOrder = async (req , res) => {
    const { status } = req.body;

    try{
        const orders = await orderModel.create({status})
        res.status(200).json(orders)

    }catch(e){
        res.status(400).json({error:error.message})
    }
}

//Update Order

//Delete Order



module.exports = {
    getAllOrders,
    getOrderById,
    PostOrder,
}