// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC1HgRHxRuWHOXnxDALw06H7kuUlAXYqY",
  authDomain: "k3vrwebsite.firebaseapp.com",
  projectId: "k3vrwebsite",
  storageBucket: "k3vrwebsite.firebasestorage.app",
  messagingSenderId: "668638921207",
  appId: "1:668638921207:web:4176cf5134a788378a6ef2",
  measurementId: "G-6KL0VG28TJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//npm install firebase