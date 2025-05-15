import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { verifyEmail } from '../../ReduxToolKit/driverSlice'; // Correctly import the action
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for API calls

const EmailVerification = () => {
  const { email } = useSelector((state) => state.driver);
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false); // Track if the email is sent
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendVerificationEmail = async () => {
    try {
      const response = await axios.post('http://foodhub.local:30002/api/send-verification-email', { email }); // Updated endpoint
      if (response.status === 200) {
        alert('Verification email sent!');
        setIsEmailSent(true);
      }
    } catch (error) {
      console.error('Failed to send verification email:', error.response || error.message);
      alert('Failed to send verification email. Please try again.');
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post('http://foodhub.local:30005/api/verify-code', { email, verificationCode }); // Correct endpoint
      if (response.status === 200) {
        dispatch(verifyEmail()); // Dispatch the correct action
        navigate('/location-access'); // Navigate to the correct page
      } else {
        alert('Invalid verification code');
      }
    } catch (error) {
      console.error('Verification failed:', error.response || error.message);
      alert('Verification failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Email Verification</h1>
        <p className="text-gray-600 text-center mb-4">
          {isEmailSent
            ? `A verification code has been sent to: ${email}`
            : `Click the button below to send a verification code to: ${email}`}
        </p>
        {!isEmailSent && (
          <button
            onClick={sendVerificationEmail}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-6 transition duration-300"
          >
            Send Verification Email
          </button>
        )}
        {isEmailSent && (
          <>
            <input
              type="text"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleVerify}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              Verify
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;