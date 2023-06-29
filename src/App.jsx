import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';


//AOS
import 'aos/dist/aos.css';
import './css/style.css';
import AOS from 'aos';
//AOS


import Home from './pages/Home';

import SignUp from './pages/SignUp';
import VerificationPage from './pages/VerifyEmail';
import Blogger from './pages/Blogger';
import CreateBlog from './partials/CreateBlog';
import WriteBlog from './partials/WriteBlog';
import SigninForm from './pages/SignIn';
import SignupForm from './pages/SignUp';
import Profile from './pages/ProfilePage';
import SearchBar from './partials/Search';


function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>

        <Route exact path="/" element={<Home/>} />
        <Route path="/signin" element={<SigninForm/>} />
        <Route path="/signup" element={<SignupForm/>} />
        <Route path="/verification/:token" element={<VerificationPage/>} />
        <Route path="/verification-change-email/:token" elemet={<VerificationPage/>} />
        {/* <Route path="/forgot-password" element={}/> */}
        {/* <Route path="/reset-password/:token" element={} /> */}
        <Route path="/Welcome-to-Circuit-Couture-404" element={<Blogger/>} />
        <Route path="/Malware-Activated" element={<WriteBlog/>} />
        <Route path="/profile-page" element={<Profile/>} />
        <Route path='/search' element={<SearchBar/>}/>







      </Routes>
    </>
  );
}

export default App;