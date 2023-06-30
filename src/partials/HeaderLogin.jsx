import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../images/LOGO 404 2.svg";
import {
  PlusCircleIcon,
  SearchIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/user";

function HeaderLogin() {
  const [top, setTop] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
    navigate("/");
  };

  const token = localStorage.getItem("token");

  return (
    <header>
      <div className="flex items-center justify-between relative">
        <Link to="/" className="block">
          <img
            src={bg}
            alt="logo"
            srcSet=""
            className="w-36 m-auto mt-auto max-sm:w-16"
          />
        </Link>
        <nav className="flex flex-grow">
          <ul className="flex flex-grow justify-end flex-wrap items-center">
            <li>
              <Link
                to="/"
                className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
              >
                Home
              </Link>
            </li>

            {token ? (
              <>
                <li className="ml-auto">
                  <Link
                    to="/Malware-Activated"
                    className="btn-sm text-gray-600 hover:translate-x-5 ml-3"
                  >
                    <span>Unleash Your Fashion Article</span>
                    <div className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-600">
                      <PlusCircleIcon className="w-9 h-9" />
                    </div>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center text-gray-600 hover:text-gray-900 relative"
                  >
                    <UserCircleIcon className="w-9 h-9" />
                    <svg
                      className={`w-4 h-4 ml-1 transition-transform duration-300 ease-in-out transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.707a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute right-0 w-40 py-2 mt-2 bg-white rounded-lg shadow-xl z-10">
                      <li>
                        <Link
                          to="/profile-page"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Logout
                        </button>
                      </li>
                      <li>
                        <Link
                          to="/my-blog"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          My Circuit Blog
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
    
                  <Link
                    to="/signin"
                    className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                  >
                    <span>Sign up</span>
                    <svg
                      className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link
                to="/search"
                className="text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
              >
                <SearchIcon className="w-9 h-9 mr-1" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HeaderLogin;
