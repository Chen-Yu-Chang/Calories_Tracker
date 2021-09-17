// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPyj-HQiIrbTmIfrUdb7TBPwmeZ0BUx9U",
    authDomain: "mini-74136.firebaseapp.com",
    projectId: "mini-74136",
    storageBucket: "mini-74136.appspot.com",
    messagingSenderId: "1032992648810",
    appId: "1:1032992648810:web:49f3c156fe20ed8793a413",
    //measurementId: "G-0WGZ5L1FSL"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export const store = firebase.firestore();
export default auth;
//const analytics = getAnalytics(app);