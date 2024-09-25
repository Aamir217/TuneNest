// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJb98Pdk3eC8YiH9zdoY8RB_YQcP_3CpY",
  authDomain: "songsdatabase-bf17e.firebaseapp.com",
  projectId: "songsdatabase-bf17e",
  storageBucket: "songsdatabase-bf17e.appspot.com",
  messagingSenderId: "672354976188",
  appId: "1:672354976188:web:23a99530f51fb1b5876bb9",
  measurementId: "G-234MQJ7Z5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);