// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBBVfi16KbXLRH5mTZYFUNS-IpnERexWlU",
    authDomain: "portf2-504a5.firebaseapp.com",
    projectId: "portf2-504a5",
    storageBucket: "portf2-504a5.appspot.com",
    messagingSenderId: "321073986940",
    appId: "1:321073986940:web:998b07f6b5dd229c55b8f9",
    measurementId: "G-YRJBT8EBZG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
