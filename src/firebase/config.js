// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "secret",
  authDomain: "secret",
  projectId: "secret",
  storageBucket: "secret",
  messagingSenderId: "secret",
  appId: "secret",
  measurementId: "secret"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Add scopes for Google authentication
googleProvider.addScope('email');
googleProvider.addScope('profile');

export default app;
