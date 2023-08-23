// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBE_Kxh-7NOAC6HCMHQWEdQczEWlBqfE9Y",
    authDomain: "seinfarm-ced96.firebaseapp.com",
    projectId: "seinfarm-ced96",
    storageBucket: "seinfarm-ced96.appspot.com",
    messagingSenderId: "330984135100",
    appId: "1:330984135100:web:178f71ce1e860c152ab3b9"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)