import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  getDocs,
  setDoc,
  query,
  collection,
  where,
  doc,
} from "firebase/firestore";
const SocialLogin = () => {
  const { app, signUp, signIn, loggedIn } = useContext(AuthContext);
  const [state, setState] = useState({
    google: false,
  });
  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();

  const handleGoogleAuth = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // Create a new document in collection users with ID user.uid
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, {
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          bio: "",
          city: "",
          country: "",
          authProvider: "google",
        });
        console.log(user);
      } else {
        console.log("User already exists");
        setState({ ...state, google: false });
        signUp(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithubAuth = async () => {
    try {
      const provider = new GithubAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const user = res.user;

      const q = query(collection(db, "users"), where("uid", "===", user.uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // Create a new document in collection users with ID user.uid
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, {
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          bio: "",
          authProvider: "github",
        });
        await updateProfile(auth.currentUser, {
          displayName: user.displayName,
          photoURL: user.photoURL,
          bio: user.bio,
        });
      } else {
        console.log("User already exists");
        signIn(user.email, user.uid);
      }
      setState({ ...state, github: false });
      signUp(user);
    } catch (error) {
      console.log(error);
    }
  };

  if (loggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="flex flex-row">
      <button
        loading={state.google}
        className="w-full text-sm py-2.5 text-center"
        size="large"
        onClick={() => handleGoogleAuth()}
      >
        <img
          src="https://img.icons8.com/color/48/000000/google-logo.png"
          alt="google"
          className="w-10 h-10 inline-block mr-2"
        />
      </button>
      <button
        className="w-full text-sm py-2.5 text-center"
        size="large"
        onClick={() => handleGithubAuth()}
        loading={state.github}
      >
        <img
          src="https://img.icons8.com/ios/50/000000/github.png"
          alt="github"
          className="w-10 h-10 inline-block mr-2"
        />
      </button>
    </div>
  );
};

export default SocialLogin;
