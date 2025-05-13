import React from "react";
import { CheckCircleIcon } from "lucide-react"; // Optional: add an icon for better visuals

const SuccessfullyRegistration = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-green-600 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8  text-center " >
        <div className="flex flex-col items-center mb-6">
          <CheckCircleIcon className="text-green-500 w-16 h-16 mb-4" />
          <h1 className="text-3xl font-extrabold text-green-700 mb-2">Registration Successful!</h1>
          <p className="text-gray-700 text-lg">Welcome aboard, Delivery Hero! 🚚</p>
        </div>

        <p className="text-gray-600 mb-2">
          Your account has been successfully created. We're excited to have you on our team!
        </p>
        <p className="text-gray-600 mb-2">
          You can now access your dashboard, manage your deliveries, and start earning.
        </p>
        <p className="text-gray-600 mb-4">
          Let’s make deliveries faster and customers happier – together!
        </p>

        <button
          onClick={() => window.location.href = '/dashboard'} // replace with your actual route
          className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-md transition duration-300"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessfullyRegistration;
