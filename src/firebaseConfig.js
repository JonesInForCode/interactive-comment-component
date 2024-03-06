import * as dotenv from '../dotenv'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOkbm6Rt0PRTXef6YkBI2QV0HSJlB57FA",
    authDomain: "interactive-comments-ba5fc.firebaseapp.com",
    projectId: "interactive-comments-ba5fc",
    storageBucket: "interactive-comments-ba5fc.appspot.com",
    messagingSenderId: "345305177386",
    appId: "1:345305177386:web:ac637d9e96aeff57e71253"
                };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
