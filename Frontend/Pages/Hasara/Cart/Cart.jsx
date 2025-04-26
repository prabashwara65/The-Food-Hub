import React, { useEffect, useState } from 'react';
import Navbar from '../../../Components/Navbar';
import { useSelector , useDispatch} from 'react-redux';
import Footer from '../../../Components/Footer';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { setCartItems } from '../../../ReduxToolKit/cartSlice';
import {loadStripe} from '@stripe/stripe-js';

function Cart() {
  const [loading, setLoading] = useState(true);
  const [cartItem, setCartItem] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const user = useSelector((state) => state.user.user);
  const email = user?.email;
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/cart/getCartItem/${email}`);
        const data = await response.json();
        setCartItem(data);
        dispatch(setCartItems(data));

        // Set selected items
        const selectedIds = data.filter(item => item.selectStatus).map(item => item._id);
        setSelectedItemIds(selectedIds);

        // Calculate total price
        const selectedTotal = data
          .filter(item => item.selectStatus)
          .reduce((acc, item) => acc + item.quantity * (item.menuPrice || item.price || 0), 0);
        setTotalPrice(selectedTotal);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart item', error);
        setLoading(false);
      }
    };

    fetchCartItem();
  }, [email, dispatch]);

  const handleSelectItem = async (item) => {
    const newStatus = !item.selectStatus;

    try {
      // Update item on the server
      await fetch(`http://localhost:4000/api/cart/updateSelectStatus/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectStatus: newStatus }),
      });

      // Update selected IDs locally
      let updatedSelectedIds = [...selectedItemIds];
      if (newStatus) {
        updatedSelectedIds.push(item._id);
      } else {
        updatedSelectedIds = updatedSelectedIds.filter(id => id !== item._id);
      }
      setSelectedItemIds(updatedSelectedIds);

      // Update cart items locally
      const updatedCart = cartItem.map(ci =>
        ci._id === item._id ? { ...ci, selectStatus: newStatus } : ci
      );
      setCartItem(updatedCart);
      dispatch(setCartItems(updatedCart))

      // Recalculate total price
      const selectedTotal = updatedCart
        .filter(i => updatedSelectedIds.includes(i._id))
        .reduce((acc, i) => acc + i.quantity * (i.menuPrice || i.price || 0), 0);
      setTotalPrice(selectedTotal);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleCheckout = async() => {
    if (!selectedItemIds.length) {
      toast.error("Please select at least one item to proceed.");
      return;
    }

    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    const selectedItems = cartItem.filter(item => selectedItemIds.includes(item._id))
    
    const body = {
      items: selectedItems,
      email: user?.email, 
    };

    try{
      const response = await fetch("http://localhost:4000/api/checkout/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const session = await response.json();
      if (session.id) {
        await stripe.redirectToCheckout({ sessionId: session.id });
      } else {
        toast.error("Failed to initiate payment.");
      }
    } catch (error){
      console.error("Checkout error:", error);
      toast.error("Something went wrong during checkout.");
    }
  };
  

  //delete item in cart
  const handleDeleteItem = async (id) => {
    console.log("Trying to delete:", id);
    toast((t) => (
      <div>
        <p>Are you sure you want to delete this item from your cart?</p>
        <div className="flex justify-end gap-2 mt-3">
          <button
            className="px-3 py-1 bg-red-500 text-white rounded-md"
            onClick={async () => {
              try {
                const response = await fetch(`http://localhost:4000/api/cart/${id}`, {
                  method: "DELETE",
                });
  
                if (response.ok) {
                  // Update frontend state
                  const updatedCart = cartItem.filter((item) => item._id !== id);
                  setCartItem(updatedCart);
                  dispatch(setCartItems(updatedCart))
  
                  const updatedSelectedIds = selectedItemIds.filter((selectedId) => selectedId !== id);
                  setSelectedItemIds(updatedSelectedIds);
  
                  const newTotal = updatedCart
                    .filter(item => updatedSelectedIds.includes(item._id))
                    .reduce((acc, item) => acc + item.quantity * (item.menuPrice || item.price || 0), 0);
                  setTotalPrice(newTotal);
  
                  toast.success("Cart item deleted successfully!");
                } else {
                  toast.error("Failed to delete cart item.");
                }
              } catch (error) {
                console.error("Error deleting cart item:", error);
                toast.error("An error occurred while deleting.");
              }
              toast.dismiss(t.id);
            }}
          >
            Yes
          </button>
          <button
            className="px-3 py-1 bg-gray-300 text-black rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: "top-center",
    });
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!cartItem.length) return <div className="text-center mt-10">Cart item not found</div>;

 //update quantity
 const handleQuantityChange = async (itemId, newQuantity) => {
  if (newQuantity < 1) return;

  try {
    const response = await fetch(`http://localhost:4000/api/cart/updateQuantity/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    if (response.ok) {
      const updatedCart = cartItem.map(item =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItem(updatedCart);
      dispatch(setCartItems(updatedCart))

      const updatedSelectedItems = updatedCart.filter(item =>
        selectedItemIds.includes(item._id)
      );
      const updatedTotal = updatedSelectedItems.reduce(
        (acc, item) => acc + item.quantity * (item.menuPrice || item.price || 0), 0
      );
      setTotalPrice(updatedTotal);
    } else {
      toast.error('Failed to update quantity');
    }
  } catch (error) {
    console.error('Error updating quantity:', error);
    toast.error('An error occurred while updating quantity');
  }
};


  return (
    <div>
    <div className="min-h-screen px-12 bg-gradient-to-r from-[#F6EFC8] via-[#EDECE3] to-[#F6EFC8]">
      <Navbar />
      <h2 className="text-2xl font-bold mb-2 mt-3 p-2 text-orange-700">My Plate</h2>

      <div className="bg-white/75 p-6 shadow-3xl flex justify-between items-center mt-2">
        <h4 className="font-thin">
          You have <span className="text-orange-500 font-bold">{cartItem.length}</span> products in your plate
        </h4>
        <h4 className="font-thin">
          Expected Delivery: <span className="text-orange-500 font-bold">30 mins</span>
        </h4>
      </div>

      <div className="bg-white/75 p-6 shadow-3xl overflow-x-auto ">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase text-gray-700 bg-orange-200">
            <tr>
              <th></th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Availability</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItem.map((item) => (
              <tr key={item._id} className={`border-b ${item.menuAvailability ? 'bg-white' : 'bg-gray-100 text-gray-400'}`}>
                <td className="px-4">
                  <input
                    type="checkbox"
                    checked={selectedItemIds.includes(item._id)}
                    onChange={() => handleSelectItem(item)}
                    className="w-5 h-5 accent-orange-200"
                    disabled={!item.menuAvailability}
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-4">
                  {item.menuImage && (
                    <img src={item.menuImage} alt={item.menuTitle} className="w-15 h-15 rounded object-cover" />
                  )}
                  {item.menuTitle}
                </td>
                <td className="px-6 py-4">{item.menuAvailability ? 'Available' : 'Out of Stock'}</td>
                <td className="px-6 py-4">
                <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                 disabled={!item.menuAvailability}
                 className={`pb-1 w-8 text-white font-bold rounded-full ${
                  item.menuAvailability ? 'bg-black hover:text-gray-800' : 'bg-gray-300 cursor-not-allowed'
                }`}>
                  -
                    </button>
             <span className="mx-3">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  disabled={!item.menuAvailability}
                     className={`pb-1 w-8 text-white font-bold rounded-full ${
                      item.menuAvailability ? 'bg-black hover:text-gray-800' : 'bg-gray-300 cursor-not-allowed'
                    }`}>
                    +
             </button>
             </td>
                <td className="px-6 py-4">Rs. {item.menuPrice}</td>
                <td className="px-4 py-2">Rs. {item.quantity * item.menuPrice}</td>
                <td className="px-4 py-2">
               <button onClick={() => handleDeleteItem(item._id) } className="text-black hover:text-gray-600 ">
              <FaTrash size={20}/>
           </button>
        </td>
           </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedItemIds.length > 0 && (
        <div className="mt-4 p-4 mb-5 bg-orange-50 rounded-lg flex justify-between items-center shadow-md">
          <h4 className="text-lg font-semibold text-orange-700">
            Total: Rs. {totalPrice}
          </h4>
          <button
            onClick={handleCheckout}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold transition-all duration-200">
            Pay for My Plate
          </button>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
}

export default Cart;
