
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  
import { getAnalytics } from "firebase/analytics"; 

const firebaseConfig = {
  apiKey: "AIzaSyBkFNcK_G9u4Ji1KKe3YWHD4Uzczvni64s",
  authDomain: "instagram-3b15d.firebaseapp.com",
  projectId: "instagram-3b15d",
  storageBucket: "instagram-3b15d.firebasestorage.app",
  messagingSenderId: "476443477505",
  appId: "1:476443477505:web:24572729724420f8022200",
  measurementId: "G-GPM7CS771T"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app); 
const db = getFirestore(app);  
const storage = getStorage(app);  
const analytics = getAnalytics(app); 
export { app, auth, db, storage, analytics };
