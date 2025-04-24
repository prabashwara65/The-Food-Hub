const Cart = require('../../Model/Cart/CartModel');

const createCart = async (req, res) => {
  const { menuId, email, quantity, price, selectStatus } = req.body;

  const cartId = `CI-${Math.floor(1000 + Math.random() * 900000)}`;
  

  try {

    // Create Cart item
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


module.exports = {createCart}