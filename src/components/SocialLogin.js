import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, getDocs, addDoc, query, collection, where } from 'firebase/firestore';
import google from '../images/google_logo.svg';
const SocialLogin = () => {
  const { app, signUp, signIn, loggedIn} = useContext(AuthContext);
  const [state, setState] = useState({
    google: false,
  });
  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();
  const handleSocialAuth = async () => {
    try{
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    console.log(user);
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const userRef = await addDoc(collection(db, 'users'), {
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        authProvider: 'google',
      });
      console.log(user);
      console.log('Document written with ID: ', userRef.id);
    } else {
      console.log('User already exists');
      signIn(user.email, user.uid);
    }
    setState({ ...state, google: false });
    signUp(user);
  }
  catch(error){
    console.log(error);
  }
  };

  if (loggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div>
      <button
            loading={state.google}
            className="w-full text-sm px-5 py-2.5 text-center"
            size="large"
            onClick={() => handleSocialAuth()}
          >
      <img
        src ={google}
        alt="google"
        className="w-10 h-10 inline-block mr-2"
      />
      </button>
    </div>
  );
};

export default SocialLogin;
