import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer';

function Cancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-100 via-white to-red-100">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <FaTimesCircle size={80} className="text-red-500 mb-6 mt-40" />
        <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Cancelled</h1>
        <p className="text-lg text-gray-600 mb-4">
          Your payment was not completed. If this was a mistake, you can try again.
        </p>
        <button
          onClick={() => navigate('/cart')}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
        >
          Return to My Plate
        </button>
      </div>
    </div>
  );
}

export default Cancel;
