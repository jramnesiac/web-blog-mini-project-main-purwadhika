import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import Banner from "../partials/Banner";
import HeaderLogin from "../partials/HeaderLogin";

function SignupForm() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&_*])/,
        "Password must contain at least one uppercase letter, one number, and one symbol"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&_*])/,
        "Password must contain at least one uppercase letter, one number, and one symbol"
      )
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const onRegister = async (values) => {
    try {
      const username = values.username;
      const email = values.email;
      const phone = values.phoneNumber;
      const password = values.password;
      const confirmPassword = values.confirmPassword;
      const FE_URL = window.location.origin;


      await axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/", {
        username,
        email,
        phone,
        password,
        confirmPassword,
        FE_URL,
      });

      toast.success("Signup successful!");

      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <HeaderLogin />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">
                  Step into a World of Fashion: Sign up and Unleash Your
                  Personal Style.
                </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <Formik
                  initialValues={{
                    username: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={onRegister}
                >
                  <Form>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="userName"
                        >
                          Username <span className="text-red-600">*</span>
                        </label>
                        <Field
                          id="username"
                          type="text"
                          name="username"
                          className="form-input w-full text-gray-800"
                          placeholder="Enter your username"
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="email"
                        >
                          Email <span className="text-red-600">*</span>
                        </label>
                        <Field
                          id="email"
                          type="email"
                          name="email"
                          className="form-input w-full text-gray-800"
                          placeholder="Enter your email address"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="phone"
                        >
                          Phone Number <span className="text-red-600">*</span>
                        </label>
                        <Field
                          id="phoneNumber"
                          type="number"
                          name="phoneNumber"
                          className="form-input w-full text-gray-800"
                          placeholder="Enter your phone number"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="password"
                        >
                          Password <span className="text-red-600">*</span>
                        </label>
                        <Field
                          id="password"
                          type="password"
                          name="password"
                          className="form-input w-full text-gray-800"
                          placeholder="Enter your password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="confirmPassword"
                        >
                          Confirm Password{" "}
                          <span className="text-red-600">*</span>
                        </label>
                        <Field
                          id="confirmPassword"
                          type="password"
                          name="confirmPassword"
                          className="form-input w-full text-gray-800"
                          placeholder="Re-enter your password"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mt-6">
                      <div className="w-full px-3">
                        <button
                        onClick={onRegister}
                          type="submit"
                          className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                        >
                          Sign up
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 text-center mt-3">
                      By creating an account, you agree to the{" "}
                      <a className="underline" href="#404">
                        terms & conditions
                      </a>
                      , and our{" "}
                      <a className="underline" href="#0">
                        privacy policy
                      </a>
                      .
                    </div>
                  </Form>
                </Formik>
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-300 flex-grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-600 italic">Or</div>
                  <div
                    className="border-t border-gray-300 flex-grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>
                <form>
                  <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full px-3">
                      <button className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
                        <svg
                          className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
                        </svg>
                        <span className="flex-auto pl-16 pr-8 -ml-16">
                          Continue with GitHub
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      {/* Button Gmail */}
                      <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                        <svg
                          className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span className="flex-auto pl-16 pr-8 -ml-16">
                          Continue with Gmail
                        </span>
                      </button>
                      {/* Button Gmail */}
                    </div>
                  </div>
                </form>
                <div className="text-gray-600 text-center mt-6">
                  Already using Couture by Circuit Couture?{" "}
                  <Link
                    to="/signin"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Banner />
    </div>
  );
}

export default SignupForm;
