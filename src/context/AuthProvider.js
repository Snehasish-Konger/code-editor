import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {initializeApp} from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import {getFirestore, collection, getDocs, where, query, addDoc, updateDoc} from 'firebase/firestore';


export const AuthContext = React.createContext();

const firebaseConfig = {
  apiKey: "AIzaSyAiF1v5lF8Ae91mXT4IVcnbuBegh25AUTs",
  authDomain: "scientyfic-world.firebaseapp.com",
  projectId: "scientyfic-world",
  storageBucket: "scientyfic-world.appspot.com",
  messagingSenderId: "72600806578",
  appId: "1:72600806578:web:931d0ecffd22a1899e15ab",
  measurementId: "G-Y1N0SW1BYE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const AuthProvider = (props) => {
  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const signUp = async(data) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = res.user;
      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        await addDoc(collection(db, 'users'), {
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        authProvider: "email",
      });
      setUser(user);
      setLoggedIn(true);
      navigate('/');
    } else {
      console.log('User already exists');
      signIn(user.email, user.uid);
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
  };




  const signIn = async(data) => {
    try {
      const res = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = res.user;
      setUser(user);
      setLoggedIn(true);
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const logOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setLoggedIn(false);
      setUser({});
      navigate('/');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        setUser({});
      }
    });
  }, []);

  const createOrUpdateAgent = async (user) => {
    return await updateDoc(collection(db, "users"), {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      describeYourself: user.describeYourself,
      authProvider: "email",
    });
  };
  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        logOut,
        signIn,
        signUp,
        user,
        createOrUpdateAgent,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
