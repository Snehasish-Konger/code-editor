import React from "react";
import male from "../images/male.svg";
import female from "../images/female.svg";
// import Numbers from "./Numbers";
import FAQ from "./FAQ";

const Testimonials = () => {
  return (
    <>
      <div class="min-w-screen min-h-screen bg-white flex items-center justify-center py-5">
        <div class="w-full bg-white px-5 py-16 md:py-24 text-gray-800">
          <div class="w-full max-w-6xl mx-auto">
            <div class="text-center max-w-xl mx-auto">
              <h1 class="text-6xl md:text-7xl font-bold mb-5 text-gray-600">
                What people <br />
                are saying.
              </h1>
              <h3 class="text-xl mb-5 font-light">
                What Developers are saying about us.
              </h3>
              <div class="text-center mb-10">
                <span class="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                <span class="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                <span class="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
                <span class="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                <span class="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
              </div>
              <div class="text-center py-4 lg:px-4">
                <div
                  class="p-2  border-2 border-black bg-[#e2e4ff] items-center text-black leading-none rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 flex-shrink-0 lg:inline-flex"
                  role="alert"
                >
                  <span class="font-semibold mr-2 text-left flex-auto">
                    Submit your feedback here
                  </span>
                  <a
                    href="https://forms.gle/kwMGsyT6jwujcqiZA"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <svg
                      class="fill-current opacity-75 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="-mx-3 md:flex items-start">
              <div class="px-3 md:w-1/3">
                <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div class="w-full flex mb-4 items-center">
                    <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img src={male} alt="" />
                    </div>
                    <div class="flex-grow pl-3">
                      <h6 class="font-bold text-sm uppercase text-gray-600">
                        Yuvraj Jwala.
                      </h6>
                    </div>
                  </div>
                  <div class="w-full">
                    <p class="text-sm leading-tight">
                      <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      Nice! Themes are very interesting and support of all
                      programing language is very good. I tried it for C++ and
                      found this very efficient. Also it is very easy to use.
                      Great job Scientyfic World.
                      <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
                <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div class="w-full flex mb-4 items-center">
                    <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img src={female} alt="" />
                    </div>
                    <div class="flex-grow pl-3">
                      <h6 class="font-bold text-sm uppercase text-gray-600">
                        Ritika Barui.
                      </h6>
                    </div>
                  </div>
                  <div class="w-full">
                    <p class="text-sm leading-tight">
                      <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      It is a clean site with a flawless look, and someone
                      without any technical background would definitely
                      appreciate it.
                      <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="px-3 md:w-1/3">
                <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div class="w-full flex mb-4 items-center">
                    <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img src={female} alt="" />
                    </div>
                    <div class="flex-grow pl-3">
                      <h6 class="font-bold text-sm uppercase text-gray-600">
                        Tithi Roy.
                      </h6>
                    </div>
                  </div>
                  <div class="w-full">
                    <p class="text-sm leading-tight">
                      <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      Really liked it. I think, a little change will be for
                      better. It'd be better if there's a "Log in" for easy
                      accessing the previous codes
                      <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
                <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div class="w-full flex mb-4 items-center">
                    <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img src={male} alt="" />
                    </div>
                    <div class="flex-grow pl-3">
                      <h6 class="font-bold text-sm uppercase text-gray-600">
                        Rakesh Tiwari.
                      </h6>
                    </div>
                  </div>
                  <div class="w-full">
                    <p class="text-sm leading-tight">
                      <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      As a computer science student, I've used a lot of
                      different code editors over the years, but
                      ScientyficWorld's IDE is definitely one of the best. It's
                      lightning-fast, easy to use, and the error highlighting
                      feature is incredibly useful. Highly recommended for
                      anyone looking for a user-friendly code editor.
                      <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="px-3 md:w-1/3">
                <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div class="w-full flex mb-4 items-center">
                    <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img src={female} alt="" />
                    </div>
                    <div class="flex-grow pl-3">
                      <h6 class="font-bold text-sm uppercase text-gray-600">
                        Kalpana Sharma.
                      </h6>
                    </div>
                  </div>
                  <div class="w-full">
                    <p class="text-sm leading-tight">
                      <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      I've been using this IDE for Python, and I'm really happy
                      with how it performs. The interface is really intuitive,
                      and I love the fact that it supports multiple programming
                      languages. The storage feature is a nice bonus, too.
                      Overall, great job!
                      <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
                <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div class="w-full flex mb-4 items-center">
                    <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img src={male} alt="" />
                    </div>
                    <div class="flex-grow pl-3">
                      <h6 class="font-bold text-sm uppercase text-gray-600">
                        Suresh Kumar.
                      </h6>
                    </div>
                  </div>
                  <div class="w-full">
                    <p class="text-sm leading-tight">
                      <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      Fantastic experience. Highly user-friendly
                      <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FAQ />
    </>
  );
};

export default Testimonials;
