import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAiF1v5lF8Ae91mXT4IVcnbuBegh25AUTs",
    authDomain: "scientyfic-world.firebaseapp.com",
    projectId: "scientyfic-world",
    storageBucket: "scientyfic-world.appspot.com",
    messagingSenderId: "72600806578",
    appId: "1:72600806578:web:931d0ecffd22a1899e15ab",
    measurementId: "G-Y1N0SW1BYE",
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);