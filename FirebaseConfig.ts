// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm6BklAHZKDnZWIzHft0CeT7JQ8hrQt1A",
  authDomain: "wellnest-49bc3.firebaseapp.com",
  projectId: "wellnest-49bc3",
  storageBucket: "wellnest-49bc3.appspot.com",
  messagingSenderId: "84722955941",
  appId: "1:84722955941:web:deb45a2ec8e9b77a633f4c",
  measurementId: "G-B4L7QDFM9K"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);
