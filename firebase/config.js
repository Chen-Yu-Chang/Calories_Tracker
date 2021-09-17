//Firebase.js

//Modules needed for Firebase.js
//Main Firebase import
import firebase from 'firebase/app';

//Firebase auth import (authentication)
import 'firebase/auth';

//Firebase firestore import (database)
import 'firebase/firestore';

//Firebase Configuration provided by Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCPyj-HQiIrbTmIfrUdb7TBPwmeZ0BUx9U",
    authDomain: "mini-74136.firebaseapp.com",
    databaseURL: "https://mini-74136-default-rtdb.firebaseio.com",
    projectId: "mini-74136",
    storageBucket: "mini-74136.appspot.com",
    messagingSenderId: "1032992648810",
    appId: "1:1032992648810:web:49f3c156fe20ed8793a413",
    measurementId: "G-0WGZ5L1FSL"
};

//Declare app
let app;
//Check if app has been initialized with Firebase...if not initialize
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

//db serves as database
const store = app.firestore();
//auth serves as authentication
const auth = firebase.auth();

//export db, auth, and provider
export { store, auth};