import React from 'react';
import logo from '../images/LOGO 404 2.svg';

function CheckEmail() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
      <div className="max-w-xl px-5 text-center">
        <h2 className="mb-2 text-4xl font-bold text-gray-800">
          <img src={logo} alt="" className="w-64 mx-auto my-auto" />
          Check your Inbox or Spam
        </h2>
      </div>
    </div>
  );
}

export default CheckEmail;
