
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDrf260fp8M3yrw0By5gsEaetApcroCuSM",
    authDomain: "rtc-real-time-chat.firebaseapp.com",
    projectId: "rtc-real-time-chat",
    storageBucket: "rtc-real-time-chat.appspot.com",
    messagingSenderId: "909096321641",
    appId: "1:909096321641:web:27266855229d8299c118f8",
    measurementId: "G-R0K8SR8J2E"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);