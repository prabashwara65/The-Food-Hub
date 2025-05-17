import React, { useEffect, useState } from 'react';
import Navbar from '../../../Components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../../../Components/Footer';
import { useSelector } from 'react-redux'; 
import { toast } from 'react-hot-toast';
import { FaShoppingCart } from "react-icons/fa";

const MenuDetails = () => {
  const { menuId } = useParams(); 
  const [menuItem, setMenuItem] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [quantity, setQuantity] = useState(1); 

  const user = useSelector((state) => state.user.user); 
  const email = user?.email;

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await fetch(`http://foodhub.local:30004/api/menu/${menuId}`);
        const data = await response.json();
        setMenuItem(data);
        setSelectedImage(data.photos && data.photos[0]); // Set first image as selected by default
        setLoading(false);
      } catch (err) {
        console.error('Error fetching menu item:', err);
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [menuId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!menuItem) return <div className="text-center mt-10">Menu item not found</div>;

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the clicked image as the selected image
  };

  // Handle adding item to the cart
  const handleAddToCart = async () => {
    if (!email) {
      toast("Please log in to add items to your cart.");
      setTimeout(() => {
        navigate('/login');
      }, 2000); 
      return;
    }

    const cartItem = {
      menuId : menuItem.menuId,
      email: email,
      quantity: quantity,
      price: menuItem.price,
      selectStatus: false,
    };

    try{
      const response = await fetch('http://foodhub.local:30000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      })

      if(response.ok){
         toast(`${menuItem.title} has been added to the cart.`);
         console.log("Cart response:", response.status);
      }else {
        toast('Failed to add to cart. Please try again..');
      }

    }catch (error){
      console.error("Error adding to cart", error)
      toast("Error adding to cart...")
    }
  };

  return (
    <div>
    <div className="min-h-screen px-12 bg-linear-to-r from-[#F6EFC8] from-10% via-[#EDECE3] via-65% to-[#F6EFC8] to-90%">
      <Navbar />
      <div>
        <div className="bg-white/75 rounded-xl p-6 shadow-3xl flex flex-col md:flex-row gap-6 m-5 md:m-5">
          {/* Left Side */}
          <div>
            {selectedImage && (
              <img
                src={selectedImage}
                alt={menuItem.title}
                className="w-100 h-120 object-cover rounded-xl"
              />
            )}
          </div>

          {/* Right Side */}
          <div className="md:w-3/4 w-full p-10">
            <h2 className="text-2xl font-bold mb-2">{menuItem.title}</h2>
            <p className="mb-2 font-semibold">Category: {menuItem.category}</p>
            <p className="mb-2">{menuItem.description}</p>
            <p className="text-xl font-semibold mb-2 text-amber-600">Rs: {menuItem.price}</p>

            {/* Other images */}
            {menuItem.photos && menuItem.photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 mt-5">
                {menuItem.photos.slice(0).map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`${menuItem.title} ${index + 2}`}
                    className="w-50 h-40 object-cover rounded-lg cursor-pointer"
                    onClick={() => handleImageClick(photo)} // On click, update selected image
                  />
                ))}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mt-10 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="pb-1 bg-black rounded-full text-xl w-8 text-white"
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                  min="1"
                  className="w-15 p-2 border border-gray-300 rounded-lg text-center"/>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="pb-1 bg-black rounded-full text-xl w-8 text-white"
                >
                  +
                </button>
              </div>

                    <button
                          onClick={handleAddToCart}
                          className=" bg-black text-white px-3 py-3 flex items-center gap-2 rounded-lg shadow-lg hover:bg-gray-300 hover:text-black ml-20 font-semibold">
               <FaShoppingCart /> Add to Cart
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default MenuDetails;
