// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYl-Xs-LYPM2K2zDeq2y3ohFN5KYp6XJQ",
  authDomain: "scientyfic-world.firebaseapp.com",
  databaseURL: "https://scientyfic-world-default-rtdb.firebaseio.com",
  projectId: "scientyfic-world",
  storageBucket: "scientyfic-world.appspot.com",
  messagingSenderId: "72600806578",
  appId: "1:72600806578:web:3f736643253413499e15ab",
  measurementId: "G-WEVCLLWN17",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
