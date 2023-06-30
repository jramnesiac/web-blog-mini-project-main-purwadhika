import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import { useNavigate } from "react-router-dom";
import { setValue } from "../redux/user";
import HeaderLogin from "../partials/HeaderLogin";


const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])/,
        "Password must contain at least one uppercase letter, one number, and one symbol"
      )
      .required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await Axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
        values
      );
      console.log(response.data.isAccountExist);
      dispatch(setValue(response.data.isAccountExist));
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        navigate("/Welcome-to-Circuit-Couture-404");
        resetForm();
      }, 2000);
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = () => {
    navigate("/reset-password"); // Ganti dengan path halaman reset password yang sesuai
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <HeaderLogin/>
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">
                  Welcome back to Your Style Haven: Circuit Couture Awaits You.
                </h1>
              </div>

              <div className="max-w-sm mx-auto">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={RegisterSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label
                            className="block text-gray-800 text-sm font-medium mb-1"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            className="form-input w-full text-gray-800"
                            placeholder="Enter your email address"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label
                            className="block text-gray-800 text-sm font-medium mb-1"
                            htmlFor="password"
                          >
                            Password
                          </label>
                          <div className="flex items-center">
                            <Field
                              type={showPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              className="form-input w-full text-gray-800"
                              placeholder="Enter your password"
                            />
                            <button
                              type="button"
                              className="text-sm font-medium text-blue-600 hover:underline ml-2"
                              onClick={toggleShowPassword}
                            >
                              {showPassword ? (
                                <EyeOffIcon className="w-4 h-4 inline-block" />
                              ) : (
                                <EyeIcon className="w-4 h-4 inline-block" />
                              )}
                            </button>
                          </div>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                          <button
                            type="submit"
                            className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Signing in..." : "Sign In"}
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mt-4">
                        <div className="w-full px-3">
                          <button
                            type="button"
                            className="text-blue-600 hover:underline"
                            onClick={handleResetPassword}
                          >
                            Forgot password? Reset here.
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Banner />
    </div>
  );
};

export default SigninForm;
