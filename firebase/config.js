import firebase from 'firebase/app';

//authentication
import 'firebase/auth';
//firestore
import 'firebase/firestore';

//Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZPHL0B303JMOSKEUW43IkzJJ8IUrUhSs",
    authDomain: "scantoknow-27f8e.firebaseapp.com",
    projectId: "scantoknow-27f8e",
    storageBucket: "scantoknow-27f8e.appspot.com",
    messagingSenderId: "435405402647",
    appId: "1:435405402647:web:cddc349cb17a3fa28ea252"
    //measurementId: "G-0WGZ5L1FSL"
};

export const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
//firestore
export const store = firebase.firestore();
//authentication
export default auth;
