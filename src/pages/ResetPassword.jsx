import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';

import Header from '../partials/Header';
import Banner from '../partials/Banner';

function ResetPassword() {
  const { token } = useParams();

  const ForgotSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const handleSubmit = async (values) => {
    try {
      values.FE_URL = window.location.origin;
      const response = await Axios.put(
        'https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass',
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      alert('Email sent. Please check your email and follow the instructions to reset your password.');
    } catch (err) {
      console.log(err.response);
      if (err.response && err.response.status === 404) {
        alert('Email not found. Please check your email address and try again.');
      } else {
        alert('Wrong email.');
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Header />

      {/* Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4">Reclaim Your Fashion Identity: Welcome to Couture by Carmilla</h1>
                <p className="text-xl text-gray-600">
                  Enter the email address you used when you signed up for your account, and we’ll email you a link to
                  reset your password.
                </p>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={formik.handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your email address"
                        {...formik.getFieldProps('email')}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500">{formik.errors.email}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        type="submit"
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                      >
                        Send reset link
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Banner />
    </div>
  );
}

export default ResetPassword;
