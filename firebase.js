// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnzPodKf-Mr113q0VC0311IsTua-wEbQ8",
  authDomain: "multig-ecommerce.firebaseapp.com",
  projectId: "multig-ecommerce",
  storageBucket: "multig-ecommerce.appspot.com",
  messagingSenderId: "1014487973069",
  appId: "1:1014487973069:web:b8b6045201fd82667ebd84",
  measurementId: "G-EGV0SDBVPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export {db,storage}