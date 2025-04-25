import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer';

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-white to-green-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <FaCheckCircle size={80} className="text-green-500 mb-6" />
        <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful!</h1>
        <p className="text-lg text-gray-600 mb-4">Thank you for your order. Your delicious meal is on its way!</p>
        <p className="text-sm text-gray-500">Redirecting to home page in a few seconds...</p>
      </div>
      <Footer />
    </div>
  );
}

export default Success;