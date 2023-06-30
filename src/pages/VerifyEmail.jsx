import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import logo from '../images/LOGO 404 2.svg'

function VerificationPage() {
  const navigate = useNavigate();
  const { token } = useParams();

  const verify = async () => {
    try {
      const response = await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/verify",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
     
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (err) {
      console.log(err);
     
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
      <div className="max-w-xl px-5 text-center">
        <h2 className="mb-2 text-4xl font-bold text-gray-800">
          <img src={logo} alt="" className="w-64 mx-auto my-auto" />
          Welcome to Circuit Couture
        </h2>
        <p className="mb-2 text-lg text-gray-500">
          Fashion Access Granted: One Step to Circuit Couture
        </p>

        <button

          onClick={verify}
          type="button"
          className="btn text-white bg-blue-600 hover:bg-blue-700 mt-4"
        >
          Click to Verification Email
        </button>

      </div>
    </div>
  )
}

export default VerificationPage
