import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../Components/Navbar";
import Banner from "../../../Components/BannerRestaurant";
import Footer from "../../../Components/Footer";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from 'react-hot-toast';

const RestaurantDetails = () => {
  const { id } = useParams(); // restaurantId from URL
  const [menus, setMenus] = useState([]);
    const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const email = user?.email;

  useEffect(() => {
    fetch(`http://localhost:4000/api/restaurantView/byRestaurant/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Filter menus to only include available ones
        const availableMenus = data.filter((menu) => menu.availability === true);
        setMenus(availableMenus);
      })
      .catch((err) => {
        console.error("Error fetching menus:", err);
        setMenus([]);
      });
  }, [id]);

  //handling adding item to cart
  const handleAddToCart = async (menu) => {
    if(!email){
      toast("Please log in to add items to your cart");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return ;
    }

    const cartItem = {
      menuId: menu.menuId,
      email:email,
      quantity: 1,
      price: menu.price,
      selectStatus: false,
    }

    try{
      const response = await fetch('http://localhost:4000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      })
      
      if(response.ok){
        toast(`${menu.title} has been added to the cart.`);
        console.log("Cart response:", response.status);
     }else {
      toast('Failed to add to cart. Please try again..');
     }
    }catch (error){
      console.error("Error adding to cart", error)
      toast("Error adding to cart...")
    }
  }

  return (
    <div>
    <div className="min-h-screen px-12 bg-linear-to-r from-[#F6EFC8] from-10% via-[#EDECE3] via-65% to-[#F6EFC8] to-90%">
        <Navbar />
       <div className=" p-5"> 
        <Banner restaurantId={id}/>
      {menus.length === 0 ? (
        <p>No menu available.</p>
      ) : (
        <div className="grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 mb-10">
          {menus.map((menu) => (
          <div key={menu.menuId} className="p-4 rounded shadow-xl bg-white/75 backdrop-blur-sm flex flex-col justify-between h-full">
           <div>
           <Link to={`/menu/${menu.menuId}`} className="hover:underline text-black-900">
               <h2 className="font-bold text-lg">{menu.title}</h2>
           </Link>
              {menu.photos?.length > 0 && (
              <Link to={`/menu/${menu.menuId}`}>
              <img
                src={menu.photos[0]}
                alt={menu.title}
                className="mt-2 w-full h-45 object-cover rounded hover:opacity-90 transition"
              />
            </Link>
             )}
           </div>

          <div className="mt-4 flex justify-between items-center">
              <p className="font-bold  text-lg">Rs. {menu.price}</p>
              <button 
              onClick={() => handleAddToCart(menu)}
              className="bg-black text-white px-2 py-1 rounded flex items-center gap-2 hover:bg-gray-300 hover:text-black transition">
              <FaShoppingCart /> Add to Cart
              </button>
        </div>
        </div>
        ) )}
        </div>
      )}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default RestaurantDetails;
