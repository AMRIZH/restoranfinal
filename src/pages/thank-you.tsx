// pages/thank-you.tsx

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ThankYou: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You for Your Order!</h1>
        <p className="text-lg text-gray-700 mb-8">Your order has been successfully processed. We will notify you once your order is shipped.</p>
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none"
          onClick={() => window.location.href = "/"} // Redirect to Home
        >
          Go to Home
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ThankYou;
