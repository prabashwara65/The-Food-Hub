// const orderModel = require('../../Model/Order/OrderModel')

// //Get all orders
// const getAllOrders = async (req , res) => {
//     const orders = await orderModel.find({}).sort({createdAt:-1})
//     res.status(200).json(orders)
// }


// //Get one order
// const getOrderById = async (req , res) => {
//     const { id } = req.params 

//     const orders = await orderModel.findById(id)

//     if(!orders){
//         return res.status(404).json({error:"No Such Orders"})
//     }

//     res.status(200).json(orders)
// }

// //Post New Order
// const PostOrder = async (req , res) => {
//     const { status } = req.body;

//     try{
//         const orders = await orderModel.create({status})
//         res.status(200).json(orders)

//     }catch(e){
//         res.status(400).json({error:error.message})
//     }
// }

// //Update Order

// //Delete Order



// module.exports = {
//     getAllOrders,
//     getOrderById,
//     PostOrder,
// }

const orderModel = require("../../Model/Order/OrderModel");

//Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });

    const updatedOrders = orders.map((order) => {
      const adminCommission = order.amount * 0.1;
      const deliveryFee = order.amount * 0.05;
      const restaurantEarning = order.amount - adminCommission - deliveryFee;

      return {
        ...order._doc,
        adminCommission,
        deliveryFee,
        restaurantEarning,
      };
    });

    res.status(200).json(updatedOrders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get one order
const getOrderById = async (req, res) => {
  const { id } = req.params;

  const orders = await orderModel.findById(id);

  if (!orders) {
    return res.status(404).json({ error: "No Such Orders" });
  }

  res.status(200).json(orders);
};

//Post New Order
const PostOrder = async (req, res) => {
  const { status } = req.body;

  try {
    const orders = await orderModel.create({ status });
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json({ error: error.message });
  }
};

//Update Order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status, paymentStatus } = req.body;

  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      { status, paymentStatus },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await orderModel.findByIdAndDelete(id);
    res.status(200).json(deletedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  PostOrder,
  updateOrder,
  deleteOrder,
};
