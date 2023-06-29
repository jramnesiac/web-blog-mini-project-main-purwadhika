import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

import logo from '../images/LOGO 404 2.svg'

const VerificationPage = () => {
  // get token from params
  const { token } = useParams()
  const navigate = useNavigate()

  // state for timer
  const [timer, setTimer] = useState(20)

  // function to send token for verification
// function to send token for verification
const verify = async () => {
  const headers = {
    Authorizations: `Bearer ${token}`,
  };

  try {
    const response = await axios.patch(
      'https://minpro-blog.purwadhikabootcamp.com/api/auth/verify',
      {},
      { headers: headers }
    );

    // Lakukan penanganan data response sesuai kebutuhan Anda
    console.log(response.data);
  } catch (error) {
    // Lakukan penanganan error sesuai kebutuhan Anda
    console.error('Error verifying token:', error);
  }
};


  // hook for sending token to be verified and countdown timer
  useEffect(() => {
    verify()

    // save token to local storage
    localStorage.setItem('token', token)

    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1)
    }, 1000)

    // navigate to home page after 20 seconds
    setTimeout(() => {
      navigate('/')
    }, 20000)

    // clear interval when component unmounts
    return () => clearInterval(countdown)
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
      <div className="max-w-xl px-5 text-center">
        <h2 className="mb-2 text-4xl font-bold text-gray-800">
          <img src={logo} alt="" className="w-64 mx-auto my-auto" />
          Check your inbox
        </h2>
        <p className="mb-2 text-lg text-gray-500">
          Fashion Access Granted: Verify Your Email
        </p>
        
        <button
          onClick={verify}
          type="button"
          className="btn text-white bg-blue-600 hover:bg-blue-700 mt-4"
        >
          Click to Verification Email
        </button>
        
        <p className="text-gray-500 mt-4">{`Redirecting in ${timer} seconds`}</p>
      </div>
    </div>
  )
}

export default VerificationPage
