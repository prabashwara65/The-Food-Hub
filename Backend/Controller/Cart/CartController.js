const Cart = require('../../Model/Cart/CartModel');

//create cart
//user fetch by logged user email
const createCart = async (req, res) => {
  const { menuId, email, quantity, price, selectStatus } = req.body;

  const cartId = `CI-${Math.floor(1000 + Math.random() * 900000)}`;

  try {
    const newCart = await Cart.create({
      cartId,
      menuId,
      email,
      quantity,
      price,
      selectStatus: selectStatus ?? false,
    });

    res.status(201).json(newCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', error: err.message });
  }
};

//get all cart items for that user 
//user fetch by using logged user email
const getCartItems = async (req,res) => {
  try{
    const {email} = req.body;

    if(!email){
      return res.status(400).json({message:'Email is required'});
    }

    const cartItems = await Cart.find({email})

    if (!cartItems.length) {
      return res.status(404).json({ message: 'No cart items found for this user' });
    }

    res.status(200).json(cartItems)
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: 'Server error while fetching cart items' });
  }

}


module.exports = {createCart, getCartItems}