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

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleType: "",
    profilePicture: "", // Base64 string for the profile picture
  });

  const [previewImage, setPreviewImage] = useState(null); // State for image preview

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePicture: reader.result, // Store the Base64 string in formData
        });
        setPreviewImage(reader.result); // Set the preview image
      };
      reader.readAsDataURL(file); // Convert the file to Base64
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert form data to a plain object
    const formDataToSubmit = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      vehicleType: formData.vehicleType,
      profilePicture: formData.profilePicture, // Base64 string
    };

    // Dispatch the plain object
    dispatch(setDriverDetails(formDataToSubmit));

    // Navigate to the email verification page
    navigate("/emailVerification");

    console.log("Form submitted:", formDataToSubmit);
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
              className={`w-full h-[660px] object-cover transition-opacity duration-700 ${
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
                <select
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                >
                  <option value="bike">Bike</option>
                  <option value="car">Car</option>
                  <option value="truck">Truck</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Profile Picture</label>
                <div className="flex items-center gap-4">
                  {/* Profile Picture Preview */}
                  <div className="w-42 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </div>

                  {/* File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Upload a clear profile picture (JPG, PNG, or JPEG).
                </p>
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