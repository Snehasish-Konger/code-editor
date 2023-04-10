import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
// import { useAuth, upload } from "./firebase";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { updateUser, user, logOut, loggedIn, storage } =
    useContext(AuthContext);

  const [imageUpload, setImageUpload] = useState(null);
  const [bio, setBio] = useState(user.bio || "");
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");

  console.log(user.uid);
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, [imagesListRef]);

  const handleLogout = () => {
    logOut();
    return <Navigate to="/" />;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    ;
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${user.uid}/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
        updateUser(user,{ bio, photoURL: url });
        showSuccessToast("Profile Updated Successfully!");
      });
    });
  };

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loggedIn ? (
        <div className="md:flex flex-col flex-wrap w-full max-w-2xl mx-auto my-10">
          <div className="flex justify-center items-center mx-4 mb-10">
            <div
              className="border-2 border-black bg-[#ffe8e2]  text-black leading-none rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-6 py-2 hover:shadow transition duration-200 md:flex flex-row"
              role="alert"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-semibold pr-2 flex-auto">
                  Currently we're working on the database, so you can't update
                  your profile. We'll update you soon.
                </span>
              </div>
            </div>
          </div>
          <form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Profile
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4 md:flex flex-row items-center">
                    <img
                      src={user.photoURL}
                      className="rounded-full"
                      alt="profile"
                    />
                    <div className="flex flex-col ml-4">
                    <h2 className="block text-sm font-medium leading-6 text-gray-900">
                      Username
                    </h2>
                    <div className="mt-2">
                      <p className="block flex-1 rounded-md border-0 bg-transparent py-1.5 pl-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
                        <span className="px-5">{user.displayName}</span>
                      </p>
                    </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <h2
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </h2>
                    <div className="mt-2">
                      <p className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <span className="px-5">{user.email}</span>
                      </p>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      About
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full rounded-md px-4 py-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Write a few sentences about yourself.
                    </p>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Profile photo
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        {imageUpload ? (
                        <img alt="" src ={imageUrls[0]} className="rounded-full w-32 h-32 mx-auto" />
                        ) : (
                          <PhotoIcon
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                        )}
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={(event) => {
                                setImageUpload(event.target.files[0]);
                              }}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <div className="mt-2">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <div className="flex items-center gap-x-2">
                <button
                  type="submit"
                  onClick={handleLogout}
                  className=" text-sm font-semibold leading-6 text-[#ff7d7d]"
                >
                  Logout
                </button>
              </div>
              <div className="flex items-center gap-x-2">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="rounded-md text-indigo-600 px-3 py-2 text-sm font-semibold shadow-sm hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Profile;
