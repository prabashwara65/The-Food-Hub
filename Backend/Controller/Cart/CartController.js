const Cart = require('../../Model/Cart/CartModel');
const Menu = require('../../Model/Menu/MenuModel');
const mongoose = require('mongoose')

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
const getCartItems = async (req, res) => {
  try {
    const { email } = req.params; 

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const cartItems = await Cart.find({ email });

    if (!cartItems.length) {
      return res.status(404).json({ message: 'No cart items found for this user' });
    }

    // Enrich cart items with menu details
    const enrichedCart = await Promise.all(cartItems.map(async (item) => {
      const menu = await Menu.findOne({ menuId: item.menuId });

      return {
        ...item.toObject(),
        menuTitle: menu?.title || 'Unknown',
        menuImage: menu?.photos?.[0] || null,
        menuAvailability: menu?.availability,
        menuPrice: menu?.price
      };
    }));

    res.status(200).json(enrichedCart);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: 'Server error while fetching cart items' });
  }
};



//update selectStaus when an item is seleced 
const updateSelectStatus = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { selectStatus } = req.body;

    // Update the selectStatus of the item
    const updatedCartItem = await Cart.findOneAndUpdate(
      { _id: cartId },
      { selectStatus },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error('Error updating selectStatus', error);
    res.status(500).json({ message: 'Server error while updating cart item' });
  }
};

// Delete a cart item
const deleteCartItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid cart item ID" });
  }

  try {
    const cart = await Cart.findByIdAndDelete(id);

    if (!cart) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart item deleted successfully", deletedItem: cart });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: "Server error while deleting cart item" });
  }
};


//update quantity'
const updateQuantity = async (req,res) => {
  const {id} = req.params
  const {quantity} = req.body

  try{
    const updateCart = await Cart.findByIdAndUpdate(
      { _id: id },
      { $set: { quantity } },
      { new: true }
    );

    if(!updateCart){
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json(updateCart)
  }catch (error){
    console.error('Error updating quantity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//delete selected items after payement
const clearSelectedItems = async (req, res) => {
  try {
    const email = req.params.email;
    await Cart.deleteMany({ email, selectStatus: true });
    res.status(200).json({ message: "Selected items cleared" });
  } catch (error) {
    console.error("Error clearing selected items:", error);
    res.status(500).json({ error: "Failed to clear selected items" });
  }
};


module.exports = {createCart, getCartItems, updateSelectStatus, deleteCartItem, updateQuantity, clearSelectedItems}