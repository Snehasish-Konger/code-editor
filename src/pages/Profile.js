import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
// import { useAuth, upload } from "./firebase";

export const Profile = () => {
  const { updateUser, user, logOut, loggedIn } = useContext(AuthContext);


  const handleLogout = () => {
    logOut();
    return <Navigate to="/" />;
  };
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  const handleSubmit = () => {
    updateUser(user);
  };

  return (
    <>
      {loggedIn ? (
        <div className=" sm:mx-32 lg:mx-32 xl:mx-72 ">
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
                      type="name"
                      placeholder={user.displayName}
                    />
                  </label>

                  <div className="shrink-0 mt-5">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.photoURL}
                      alt=""
                    />
                  </div>
                  <label className="block pt-2">
                    <span className="sr-only t-2">Choose profile photo</span>
                    <input
                      type="file"
                      onChange={handlePhoto}
                      className="mt-4 border-2 border-black z-10 rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-transparent flex-shrink-0"
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
                  <div className="md:flex flex-row justify-between">
                    <button
                      className="mt-4 border-2 border-black z-10 rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-[#9cff8f] flex-shrink-0"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                    <button
                      className="mt-4 border-2 border-black z-10 rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-[#ff9a8f] flex-shrink-0"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
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
