import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export const Profile = () => {
    const { logOut, loggedIn } = useContext(AuthContext);

    const handleLogout = () => {
      logOut();
      return <Navigate to="/" />;
    };
  return (
    <>
        {loggedIn ? (
      <div
        className=" sm:mx-32 lg:mx-32 xl:mx-72 "
      >
        <div className="flex justify-between container mx-auto">
          <div className="w-full">
            <div className="mt-4 px-4">
              <h1 className="font-thinner flex text-4xl pt-10 px-5">
                Setup Your account
              </h1>

              <form className="mx-5 my-5">
                <label
                  className="relative block p-3 border-2 border-black rounded"
                  htmlFor="name"
                >
                  <span
                    className="text-md font-semibold text-zinc-900"
                    htmlFor="name"
                  >
                    Name
                  </span>
                  <input
                    className="w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none"
                    id="name"
                    type="text"
                    placeholder="Your name"
                  />
                </label>

                <div className="shrink-0 mt-5">
                  <img src="https://images.unsplash.com/photo-1610395697868-8b8b0b2b1b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                  alt="" className="h-20 w-20 object-cover rounded-full"/>
                </div>
                <label className="block pt-2">
                  <span className="sr-only t-2">Choose profile photo</span>
                  <input
                    type="file"
                    className="w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-pink-300 file:text-zinc-900
          hover:file:bg-rose-300
        "
                  />
                </label>

                <label
                  className="relative block p-3 border-2 mt-5 border-black rounded"
                  htmlFor="name"
                >
                  <span
                    className="text-md font-semibold text-zinc-900"
                    htmlFor="name"
                  >
                    Bio
                  </span>

                  <input
                    className="w-full   p-0 text-sm border-none bg-transparent text-gray-500 focus:outline-none"
                    id="name"
                    type="text"
                    placeholder="Write Your Bio"
                  />
                </label>

                <button className="mt-5 border-2 px-5 py-2 rounded-lg border-black border-b-4 font-black translate-y-2 border-l-4" onClick={handleLogout}>

                    Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    ) : (
        <Navigate to="/" />
    )}
    </>
  );
};
