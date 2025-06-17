// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCT94VX4dqQBHXIU8hMHffyutU222NcObs",
    authDomain: "intervueai-f8ea3.firebaseapp.com",
    projectId: "intervueai-f8ea3",
    storageBucket: "intervueai-f8ea3.firebasestorage.app",
    messagingSenderId: "578700003883",
    appId: "1:578700003883:web:1b2def7a76b9a29518386e",
    measurementId: "G-1W1Y9D1XNR",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
