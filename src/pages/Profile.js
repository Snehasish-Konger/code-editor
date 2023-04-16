import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
// import { useAuth, upload } from "./firebase";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const { updateProfile, db, user, logOut, loggedIn, storage } =
    useContext(AuthContext);

  const [imageUpload, setImageUpload] = useState(null);
  const [bio, setBio] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [region, setRegion] = useState("");

  // Fetch the updated document from Firestore and set the bio state
  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setBio(data.bio);
        setCity(data.city);
        setRegion(data.region);
        setCountry(data.country);
        setStreetAddress(data.streetAddress);
        setPostalCode(data.postalCode);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    logOut();
    return <Navigate to="/" />;
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    console.log(user.uid);
    try {
      if (imageUpload == null) return;
      const imageRef = ref(storage, `images/${user.uid}/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, url]);
          updateProfile(user, { photoURL: url });
          showSuccessToast("Image Updated Successfully!");
        });
      });
    } catch (error) {
      console.log(error);
      showErrorToast("Something went wrong! Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "users", user.uid);
    try {
      await updateDoc(docRef, {
        bio: bio,
        city:city,
        region:region,
        country:country,
        streetAddress:streetAddress,
        postalCode:postalCode,
      });
      showSuccessToast("Profile Updated Successfully!");
    } catch (error) {
      console.log(error);
      showErrorToast("Something went wrong! Please try again.");
    }
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

  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
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
                      className="rounded-full h-20 w-20 object-cover"
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
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Write a few sentences about yourself."
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {bio.length}/200
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
                          <img
                            alt=""
                            src={imageUrls}
                            className="rounded-full w-32 h-32 mx-auto"
                          />
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
                    <button
                      onClick={handleImageUpload}
                      type="submit"
                      className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-indigo-600 text-base font-medium hover:text-indigo-700 sm:text-sm"
                    >
                      Upload
                    </button>
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
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>Select</option>
                        <option>Australia</option>
                        <option>Brazil</option>
                        <option>Bangladesh</option>
                        <option>Canada</option>
                        <option>Denmark</option>
                        <option>Finland</option>
                        <option>France</option>
                        <option>Italy</option>
                        <option>India</option>
                        <option>Indonesia</option>
                        <option>Ireland</option>
                        <option>Malaysia</option>
                        <option>Mexico</option>
                        <option>Norway</option>
                        <option>Philippines</option>
                        <option>Poland</option>
                        <option>Russia</option>
                        <option>Singapore</option>
                        <option>South Africa</option>
                        <option>Spain</option>
                        <option>Sweden</option>
                        <option>Turkey</option>
                        <option>Thailand</option>
                        <option>Vietnam</option>
                        <option>Argentina</option>
                        <option>Germany</option>
                        <option>Japan</option>
                        <option>Netherlands</option>
                        <option>United Kingdom</option>
                        <option>United States</option>
                        <option>China</option>
                        <option>Pakistan</option>
                        <option>Ukraine</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="streetAddress"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="streetAddress"
                        id="streetAddress"
                        value={streetAddress}
                        autoComplete="streetAddress"
                        onChange={(e) => setStreetAddress(e.target.value)}
                        className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        value={city}
                        autoComplete="address-level2"
                        onChange={(e) => setCity(e.target.value)}
                        className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        value={region}
                        autoComplete="address-level1"
                        onChange={(e) => setRegion(e.target.value)}
                        className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        value={postalCode}
                        autoComplete="postal-code"
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
