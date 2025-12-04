// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-eb190.firebaseapp.com",
  projectId: "real-estate-eb190",
  storageBucket: "real-estate-eb190.firebasestorage.app",
  messagingSenderId: "823693001276",
  appId: "1:823693001276:web:a428514b41e7436e7bf939"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);