// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import the getAuth function from Firebase
import { getFirestore } from "firebase/firestore";  // Import Firestore

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAJ1aX07WuQym06H-uRlvl6DF8eKVfeJcI",
//   authDomain: "admin-nepathya-ams.firebaseapp.com",
//   projectId: "admin-nepathya-ams",
//   storageBucket: "admin-nepathya-ams.firebasestorage.app",
//   messagingSenderId: "162981780398",
//   appId: "1:162981780398:web:07fd4db4640153a272463f",
//   measurementId: "G-M0P65HYJZG"
// };

//backup
// const firebaseConfig = {
//   apiKey: "AIzaSyCNm_VLysWSwCVdjC7BKOw76e-CyqYpIuA",
//   authDomain: "test-44a8d.firebaseapp.com",
//   projectId: "test-44a8d",
//   storageBucket: "test-44a8d.firebasestorage.app",
//   messagingSenderId: "1025063401474",
//   appId: "1:1025063401474:web:7cedf98f64a64bf2f88f1b",
//   measurementId: "G-YM1259PQK8"
// };

//Backup2
const firebaseConfig = {
  apiKey: "AIzaSyB3MRmFUzRFqEl6avwcpg5r1yPU9lLsjf8",
  authDomain: "oyetaxi1.firebaseapp.com",
  projectId: "oyetaxi1",
  storageBucket: "oyetaxi1.firebasestorage.app",
  messagingSenderId: "367826624588",
  appId: "1:367826624588:web:0b3bff32440f324b0094e9",
  measurementId: "G-Q8YZLRPGGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore, then export them
const auth = getAuth(app);  // This initializes the auth service
const firestore = getFirestore(app);  // This initializes Firestore

export { auth, firestore };  // Exporting auth and firestore to use in other files
