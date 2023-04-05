import React, { useContext } from "react";
import { useState } from "react";
import logo from "../images/sitelogo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function Header() {
  const [navbar, setNavbar] = useState(false);
  const { user, loggedIn } = useContext(AuthContext);

  return (
    <nav className="w-full border-b border-black mb-2">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex justify-between py-3 md:py-5 md:block">
            <Link to="/" className="flex flex-row items-center">
              <img src={logo} alt="Main Logo" className="w-[50px] h-[50px]" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45.42"
                height="24.603"
                viewBox="0 0 39.42 18.603"
                aria-hidden="false"
              >
                <path
                  class="a"
                  d="M6.021,0V-18.6H2.268V0Zm4.536-18.6V0h7.29a8.278,8.278,0,0,0,5.81-2.211A9.455,9.455,0,0,0,26.3-9.261c0-5.292-3.1-9.342-8.451-9.342ZM14.31-3.321V-15.282h3.537c3.1,0,4.7,2.835,4.7,6.021s-1.593,5.94-4.7,5.94ZM33.534-7.479h6.939v-3.375H33.534v-4.428h7.911V-18.6H29.781V0H41.688V-3.321H33.534Z"
                  transform="translate(-2.268 18.603)"
                ></path>
              </svg>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-lg outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-gray-600 hover:text-blue-600">
                <Link to="/">Home</Link>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <Link to="https://scientyficworld.org/blog/">Blog</Link>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <Link to="https://scientyficworld.org/snehasish-konger/">
                  About
                </Link>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <Link to="https://scientyficworld.org/contact-us/">
                  Contact US
                </Link>
              </li>
              {loggedIn ? (
                user.photoURL ? (
                  <li className="text-gray-600 hover:text-blue-600 md:flex flex-row">
                    <Link to="/profile">
                      <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                    </Link>
                  </li>
                ) : (
                  <li className="text-gray-600 hover:text-blue-600 md:flex flex-row">
                    <Link to="/profile">
                    <svg
                      width="24"
                      height="24"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    </Link>
                  </li>
                )
              ) : (
                <li className="text-gray-600 hover:text-blue-600" id="login">
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
