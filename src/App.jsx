import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setValue } from "./redux/user";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./css/style.css";

import Home from "./pages/Home";
import VerificationPage from "./pages/VerifyEmail";
import Blogger from "./pages/Blogger";
import WriteBlog from "./partials/WriteBlog";
import SigninForm from "./pages/SignIn";
import SignupForm from "./pages/SignUp";
import Profile from "./pages/ProfilePage";
import SearchBar, { SearchResult } from "./partials/Search";
import HeaderLogin from "./partials/HeaderLogin";
import BlogDetailPage from "./partials/BlogDetailPage";
import MyCircuitBlog from "./pages/MyCircuitBlog";
import ResetPassword from "./pages/ResetPassword";
import PasswordReset from "./pages/NewPassoword";
import CheckEmail from "./pages/CheckEmail";

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);

    const session = async () => {
      if (token) {
        try {
          const res = await axios.get(
            "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(setValue(res.data));
          console.log(res.data);
        } catch (error) {
          console.error("Error fetching session:", error);
        }
      }
    };

    session();
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/" element={<HeaderLogin />} />
        <Route path="/signup" element={<SignupForm />} /> 
        <Route exact
          path="/verification/:token"
          element={<VerificationPage />}
        />
        <Route
          path="/verification-change-email/:token"
          element={<VerificationPage />}
        />
        <Route path="/check-email" element={<CheckEmail/>} />
        {/* <Route path="/forgot-password" element={}/> */}
        {/* <Route path="/reset-password/:token" element={} /> */}
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<PasswordReset/>} />
        <Route
          path="/Welcome-to-Circuit-Couture-404"
          element={<Blogger />}
        />
        <Route path="/blog/:id" element={<BlogDetailPage />} />|
        <Route path="/my-blog" element={<MyCircuitBlog/>} />
        <Route path="/Malware-Activated" element={<WriteBlog />} />
        <Route path="/profile-page" element={<Profile />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
    </Router>
  );
}

export default App;
