// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKdKxS-HBXF4-lcC6MK5FK4pgy9yvt9yM",
  authDomain: "healthcare-c2c5a.firebaseapp.com",
  projectId: "healthcare-c2c5a",
  storageBucket: "healthcare-c2c5a.appspot.com",
  messagingSenderId: "138130798746",
  appId: "1:138130798746:web:8b7a16a744873336cf4723",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
