import React, { useState, useContext } from "react";
import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../context/AuthProvider";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const { db } = useContext(AuthContext);
  const docRef = collection(db, "subscribers");
  const handleSubmit = async () => {
    try {
      await addDoc(docRef, {
        email: email,
      });
      toast.success("Subscribed successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      document.getElementById("email-address").value = `${email}`;
      document.getElementById("email-address").disabled = true;
      document.getElementById("subscribe-button").disabled = true;
      document.getElementById("subscribe-button").innerHTML = "Subscribed";
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Subscribe to our newsletter.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              No spam, just the latest news and updates from us. We promise to
              keep your email address safe.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <button
                id="subscribe-button"
                type="submit"
                onClick={handleSubmit}
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon
                  className="h-6 w-6 text-gray-600"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold text-gray-600">
                Monthly articles
              </dt>
              <dd className="mt-2 leading-7 text-gray-400">
                Every month we'll send you a digest of the latest articles from
                our blog.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon
                  className="h-6 w-6 text-gray-600"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold text-gray-600">No spam</dt>
              <dd className="mt-2 leading-7 text-gray-400">
                We hate spam as much as you do. We'll never send you anything
                you don't want.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
