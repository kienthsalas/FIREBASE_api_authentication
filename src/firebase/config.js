// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhM4aaIZB4-6Cbq-LgM4BADUI_FT4vvKI",
  authDomain: "itskolar-b44be.firebaseapp.com",
  projectId: "itskolar-b44be",
  storageBucket: "itskolar-b44be.firebasestorage.app",
  messagingSenderId: "890398485533",
  appId: "1:890398485533:web:1a9a8611ac92e171be6af4",
  measurementId: "G-509W61JW6P"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Add scopes for Google authentication
googleProvider.addScope('email');
googleProvider.addScope('profile');

export default app;