import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBK6X6uoWsiNDVbTichMvz-kYUtxqM1z88",
  authDomain: "noodle-2ca6e.firebaseapp.com",
  projectId: "noodle-2ca6e",
  storageBucket: "noodle-2ca6e.firebasestorage.app",
  messagingSenderId: "211602496762",
  appId: "1:211602496762:web:da3ccd75329325dee8bd43",
  measurementId: "G-37ZV2EXJD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export {app, auth};