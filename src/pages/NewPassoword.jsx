import React, { useState } from "react";
import Axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

const PasswordReset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const NewPassword = () => {
    setShowPassword(!showPassword);
  };

  const ResetSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password didn't match")
      .required("Password is required"),
  });

  const handleSubmit = async (data) => {
    data.FE_URL = window.location.origin;
    try {
      const response = await Axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/login");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={ResetSchema}
      onSubmit={(value, action) => {
        handleSubmit(value);
        // action.resetForm();
      }}
    >
      {(props) => (
        <Form>
          <div className="flex justify-center items-center h-screen bg-black">
            <div className="p-8 max-w-md border-4 rounded-md shadow-lg">
              <div>
                <h1 className="mb-6 text-center text-white">Create new password</h1>
                <div className="mb-4">
                  <label className="block text-white" htmlFor="password">
                    Password
                  </label>
                  <ErrorMessage
                    component="div"
                    name="password"
                    className="text-red-500"
                  />
                  <Field
                    as="input"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 mt-1 rounded-md bg-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white" htmlFor="confirmPassword">
                    Confirm your password
                  </label>
                  <ErrorMessage
                    component="div"
                    name="confirmPassword"
                    className="text-red-500"
                  />
                  <Field
                    as="input"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 mt-1 rounded-md bg-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="flex items-center text-white">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={showPassword}
                      onChange={NewPassword}
                    />
                    <span className="ml-2">Show Password</span>
                  </label>
                </div>
              </div>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full"
                type="submit"
              >
                Change it!
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordReset;
