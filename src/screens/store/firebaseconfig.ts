
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Firebase Authentication
import { getFirestore } from "firebase/firestore";  // Firestore Database
import { getStorage } from "firebase/storage";  // Firebase Storage
import { getAnalytics } from "firebase/analytics";  // Firebase Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkFNcK_G9u4Ji1KKe3YWHD4Uzczvni64s",
  authDomain: "instagram-3b15d.firebaseapp.com",
  projectId: "instagram-3b15d",
  storageBucket: "instagram-3b15d.firebasestorage.app",
  messagingSenderId: "476443477505",
  appId: "1:476443477505:web:24572729724420f8022200",
  measurementId: "G-GPM7CS771T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);  // For user authentication
const db = getFirestore(app);  // For Firestore database
const storage = getStorage(app);  // For Firebase Storage
const analytics = getAnalytics(app);  // For Firebase Analytics

// Export Firebase services for use in other parts of your app
export { app, auth, db, storage, analytics };
