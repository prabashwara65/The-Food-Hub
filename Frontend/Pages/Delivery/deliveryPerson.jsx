import React, { useEffect, useState } from "react";
import deloveryP from "../../assets/images/deliveryPerson.png";
import deloveryP2 from "../../assets/images/deliverPerson2.png";
import deloveryP3 from "../../assets/images/deliveryPerson3.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDriverDetails } from "../../ReduxToolKit/driverSlice";

const DeliveryPersonView = () => {
  const deliveryPersons = [deloveryP, deloveryP2, deloveryP3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const[formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleType: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange =(e)=>{
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setDriverDetails(formData));
        navigate("/emailVerification");
        console.log("Form submitted:", formData);
    };


  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % deliveryPersons.length);
        setFade(false);
      }, 800);
    }, 5000);

    return () => clearInterval(interval);
  }, [deliveryPersons.length]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center">
          Food<span className="text-green-500">Hub</span> Delivery Team
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side */}
          <div className="relative flex-1 bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={deliveryPersons[currentIndex]}
              alt={`Delivery Person ${currentIndex + 1}`}
              className={`w-full h-[480px] object-cover transition-opacity duration-700 ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white px-6 py-4">
              <h3 className="text-lg md:text-xl font-semibold">
                Join FoodHub as a driver and deliver smiles with every meal!
              </h3>
            </div>
          </div>

          {/* Right side */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Driver Registration</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                    onChange={handleChange}
                    name="name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                <input
                  type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    name="phone"
                  placeholder="Enter your phone number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                  placeholder="Enter your email address"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Vehicle Type</label>
                <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                >
                  <option value="bike">Bike</option>
                  <option value="car">Car</option>
                  <option value="truck">Truck</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md text-lg font-medium transition duration-300"
              >
                Register Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPersonView;
