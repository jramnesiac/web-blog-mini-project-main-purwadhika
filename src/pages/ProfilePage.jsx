import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setValue, logoutUser } from '../redux/user';
import { PhotographIcon } from '@heroicons/react/solid';
import HeaderLogin from '../partials/HeaderLogin';

const validationSchemaUsername = Yup.object().shape({
    newUsername: Yup.string().required('Username is required'),
  })
  const validationSchemaEmail = Yup.object().shape({
    newEmail: Yup.string().email('Invalid email').required('Email is required'),
  })
  const validationSchemaPhone = Yup.object().shape({
    newPhone: Yup.string().required('Phone number is required'),
  })
  const validationSchemaPassword = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        'Password must contain at least one uppercase letter, one number, and one symbol'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        'Password must contain at least one uppercase letter, one number, and one symbol'
      )
      .required('Confirm Password is required'),
    currentPassword: Yup.string().required('Old Password is required'),
  })

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const FE_URL= window.location.origin;
  const token = localStorage.getItem('token');
  const email = useSelector((state) => state.user.value.email);
  const phone = useSelector((state) => state.user.value.phone);
  const username = useSelector((state) => state.user.value.username);

  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);

  const handleClick = () => {
    setShow(!show);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    // Lakukan sesuatu dengan file yang dipilih
    setImage(file);
  };

  const updateImage = async () => {
    const header = {
      Authorization: `Bearer ${token}`,
    };
    const file = image;
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);

    const res = await axios.post(
      'https://minpro-blog.purwadhikabootcamp.com/api/profile/single-uploaded',
      bodyFormData,
      { headers: header }
    );

    dispatch(
      setValue({
        imgProfile: `https://minpro-blog.purwadhikabootcamp.com/${res.data.imgProfile}`,
      })
    );
  };

  const updateUsername = async (values) => {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    const newUsername = values.newUsername;
    console.log('newUsername:', newUsername);

    await axios.patch(
      'https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername/',
      {
        FE_URL,
        newUsername,
        currentUsername: username,
      },
      { headers: header }
    );

    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  const updateEmail = async (values) => {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    const newEmail = values.newEmail;
    console.log('newEmail:', newEmail);

    await axios.patch(
      'https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail/',
      {
        FE_URL,
        newEmail,
        currentEmail: email,
      },
      { headers: header }
    );

    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  const updatePhone = async (values) => {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    const newPhone = values.newPhone;
    console.log('newPhone:', newPhone);

    await axios.patch(
      'https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone/',
      {
        FE_URL,
        newPhone,
        currentPhone: phone,
      },
      { headers: header }
    );

    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  const updatePassword = async (values) => {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    const password = values.password;
    const currentPassword = values.currentPassword;
    const confirmPassword = values.confirmPassword;
    console.log('password:', password);

    await axios.patch(
      'https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass/',
      {
        FE_URL,
        password,
        confirmPassword,
        currentPassword,
      },
      { headers: header }
    );

    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  const handleLogout = () => {
    // Hapus token dari local storage
    localStorage.removeItem('token');

    // Dispatch action logoutUser untuk menghapus data user dari Redux store
    dispatch(logoutUser);

    // Redirect ke halaman login
    navigate('/login');
  };

  return (

    <><HeaderLogin /><div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto w-full">
          <div className="space-y-6">
              <div>
                  <div>
                      <label htmlFor="file" className="text-sm text-gray-600">Profile Picture</label>
                      <input
                          type="file"
                          id="file"
                          className="h-8 w-full border border-gray-300 rounded px-2 focus:outline-none"
                          onChange={handleFileChange} />
                      <PhotographIcon className="h-20 w-auto text-gray-400 justify-normal" />
                  </div>
                  <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                      onClick={updateImage}
                  >
                      Submit
                  </button>
              </div>

              <Formik
                  initialValues={{
                      newUsername: '',
                  }}
                  validationSchema={validationSchemaUsername}
                  onSubmit={updateUsername}
              >
                  <Form className="text-green">
                      <div>
                          <label htmlFor="newUsername" className="text-sm text-gray-600">Username</label>
                          <Field
                              type="text"
                              name="newUsername"
                              placeholder={username}
                              className="h-8 w-full border border-gray-300 rounded px-2 focus:outline-none" />
                          <ErrorMessage name="newUsername" component="div" className="text-red-500 text-sm" />
                      </div>
                      <div>
                          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                              Submit
                          </button>
                      </div>
                  </Form>
              </Formik>

              <Formik
                  initialValues={{
                      newEmail: '',
                  }}
                  validationSchema={validationSchemaEmail}
                  onSubmit={updateEmail}
              >
                  <Form className="text-green">
                      <div>
                          <label htmlFor="newEmail" className="text-sm text-gray-600">Email</label>
                          <Field
                              type="text"
                              name="newEmail"
                              placeholder={email}
                              className="h-8 w-full border border-gray-300 rounded px-2 focus:outline-none" />
                          <ErrorMessage name="newEmail" component="div" className="text-red-500 text-sm" />
                      </div>
                      <div>
                          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                              Submit
                          </button>
                      </div>
                  </Form>
              </Formik>

              <Formik
                  initialValues={{
                      newPhone: '',
                  }}
                  validationSchema={validationSchemaPhone}
                  onSubmit={updatePhone}
              >
                  <Form className="text-green">
                      <div>
                          <label htmlFor="newPhone" className="text-sm text-gray-600">Phone</label>
                          <Field
                              type="text"
                              name="newPhone"
                              placeholder={phone}
                              className="h-8 w-full border border-gray-300 rounded px-2 focus:outline-none" />
                          <ErrorMessage name="newPhone" component="div" className="text-red-500 text-sm" />
                      </div>
                      <div>
                          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                              Submit
                          </button>
                      </div>
                  </Form>
              </Formik>

              <Formik
                  initialValues={{
                      password: '',
                      confirmPassword: '',
                      currentPassword: '',
                  }}
                  validationSchema={validationSchemaPassword}
                  onSubmit={updatePassword}
              >
                  <Form className="text-green">
                      <div>
                          <label htmlFor="currentPassword" className="text-sm text-gray-600">Old Password</label>
                          <Field
                              type={show ? 'text' : 'password'}
                              name="currentPassword"
                              className="h-8 w-full border border-gray-300 rounded px-2 focus:outline-none" />
                          <button
                              type="button"
                              onClick={handleClick}
                              className="text-blue-500 text-sm focus:outline-none"
                          >
                              {show ? 'Hide' : 'Show'}
                          </button>
                          <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-sm" />
                      </div>
                      <div>
                          <label htmlFor="password" className="text-sm text-gray-600">New Password</label>
                          <Field
                              type={show ? 'text' : 'password'}
                              name="password"
                              className="h-8 w-full border border-gray-300 rounded px-2 focus:outline-none" />
                          <button
                              type="button"
                              onClick={handleClick}
                              className="text-blue-500 text-sm focus:outline-none"
                          >
                              {show ? 'Hide' : 'Show'}
                          </button>
                          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                      </div>
                      <div>
                          <label htmlFor="confirmPassword" className="text-sm text-gray-600">Confirm New Password</label>
                          <Field
                              type={show ? 'text' : 'password'}
                              name="confirmPassword"
                              className="h-8 w-full border border-gray-300 rounded px-2 focus:outline-none" />
                          <button
                              type="button"
                              onClick={handleClick}
                              className="text-blue-500 text-sm focus:outline-none"
                          >
                              {show ? 'Hide' : 'Show'}
                          </button>
                          <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                      </div>
                      <div>
                      <Link to="/Welcome-to-Circuit-Couture-404">
                          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                              Submit
                          </button>
                          </Link>

                      </div>
                  </Form>
              </Formik>
          </div>
      </div></>
  );
};

export default Profile;
