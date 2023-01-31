// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqag82J_NOBp8B4QXFDIfQpspVYmIU-8s",
  authDomain: "clock-n-roll.firebaseapp.com",
  projectId: "clock-n-roll",
  storageBucket: "clock-n-roll.appspot.com",
  messagingSenderId: "944903645044",
  appId: "1:944903645044:web:c2912bbd6285499ec1ee21",
  measurementId: "G-FH3JGWXL32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {
	app,
	// analytics,
	auth,
}