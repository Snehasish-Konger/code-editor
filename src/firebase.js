// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiF1v5lF8Ae91mXT4IVcnbuBegh25AUTs",
  authDomain: "scientyfic-world.firebaseapp.com",
  databaseURL: "https://scientyfic-world-default-rtdb.firebaseio.com",
  projectId: "scientyfic-world",
  storageBucket: "scientyfic-world.appspot.com",
  messagingSenderId: "72600806578",
  appId: "1:72600806578:web:931d0ecffd22a1899e15ab",
  measurementId: "G-Y1N0SW1BYE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
