// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage  } from 'firebase/storage'
import { GoogleAuthProvider, getAuth , onAuthStateChanged } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSIszvvTKJsFvC_9vfWhG4RAj4hh8rh9o",
  authDomain: "discussions-5c9ff.firebaseapp.com",
  projectId: "discussions-5c9ff",
  storageBucket: "discussions-5c9ff.appspot.com",
  messagingSenderId: "646782758216",
  appId: "1:646782758216:web:c02681b732100f717a977d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app)
export const auth = getAuth();
export const provider = new GoogleAuthProvider();