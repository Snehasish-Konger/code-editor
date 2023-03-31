import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/sitelogo.svg";

const Footer = () => {
  return (
    <footer class="text-center border-t border-black lg:text-left mt-6 text-gray-600">
  <div class="flex justify-center items-center lg:justify-between p-6 border-b border-black">
    <div class="mr-12 hidden lg:block">
      <span>Get connected with us on social networks:</span>
    </div>
    <div class="flex justify-center">
      <Link to="https://www.facebook.com/scientyficworld/" class="mr-6 text-gray-600">
        <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f"
          class="w-2.5" role="img" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512">
          <path fill="currentColor"
            d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
          </path>
        </svg>
      </Link>
      <Link to="https://www.linkedin.com/company/scientyficworldorg/" class="mr-6 text-gray-600">
        <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in"
          class="w-3.5" role="img" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512">
          <path fill="currentColor"
            d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z">
          </path>
        </svg>
      </Link>
    </div>
  </div>
  <div class="mx-6 py-10 text-center md:text-left">
    <div class="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="">
        <div class="
            uppercase
            font-semibold
            mb-4
            flex
            items-center
            justify-center
            md:justify-start
          ">
          <Link to="/" className="flex flex-row items-center">
                            <img src={logo} alt="Main Logo" className="w-[50px] h-[50px]" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="45.42" height="24.603" viewBox="0 0 39.42 18.603" aria-hidden="false">
                                <path class="a" d="M6.021,0V-18.6H2.268V0Zm4.536-18.6V0h7.29a8.278,8.278,0,0,0,5.81-2.211A9.455,9.455,0,0,0,26.3-9.261c0-5.292-3.1-9.342-8.451-9.342ZM14.31-3.321V-15.282h3.537c3.1,0,4.7,2.835,4.7,6.021s-1.593,5.94-4.7,5.94ZM33.534-7.479h6.939v-3.375H33.534v-4.428h7.911V-18.6H29.781V0H41.688V-3.321H33.534Z" transform="translate(-2.268 18.603)"></path></svg>
                        </Link>
        </div>
        <p>
        Scientyfic World is a blogging platform for explorers and learners, for those who are searching for programming, space, or productivity-related content.
        </p>
      </div>
      <div class="">
        <h6 class="uppercase font-semibold mb-4 flex justify-center md:justify-start">
          Legal
        </h6>
        <p class="mb-4">
          <Link to="https://scientyficworld.org/privacy-policy/" class="text-gray-600">Privacy Policy</Link>
        </p>
        <p class="mb-4">
          <Link to="https://scientyficworld.org/terms-and-conditions/" class="text-gray-600">Terms and Conditions</Link>
        </p>
      </div>
      <div class="">
        <h6 class="uppercase font-semibold mb-5 flex justify-center md:justify-start">
          Useful links
        </h6>
        <p class="mb-4">
          <Link to="https://scientyficworld.org/" class="text-gray-600">Home</Link>
        </p>
        <p class="mb-4">
          <Link to="https://scientyficworld.org/blog/" class="text-gray-600">Blog</Link>
        </p>
        <p class="mb-4">
          <Link to="https://scientyficworld.org/snehasish-konger/" class="text-gray-600">About</Link>
        </p>
        <p class="mb-4">
          <Link to="https://scientyficworld.org/contact-us/" class="text-gray-600">Contact Us</Link>
        </p>
        <p class="mb-4">
          <Link to="/reviews" class="text-gray-600">Reviews</Link>
        </p>
      </div>
      <div class="">
        <h6 class="uppercase font-semibold mb-4 flex justify-center md:justify-start">
          Mail Us
        </h6>
        <p class="flex items-center justify-center md:justify-start mb-4">
          <Link to="mailto:support@scientyficworld.org" class="flex items-center justify-center md:justify-start mb-4">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope"
            class="w-4 mr-4" role="img" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path fill="currentColor"
              d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z">
            </path>
          </svg>
          support@scientyficworld.org
          </Link>
        </p>
      </div>
    </div>
  </div>
  <div class="text-center p-2 border-t border-black">
    <span>© 2023 Copyright:</span>
    <Link class="text-gray-600 font-semibold" to="https://scientyficworld.org">Scientyfic World</Link>
  </div>
</footer>
  );
};

export default Footer;
