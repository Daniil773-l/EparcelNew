
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA8mPnE1uC8dt7y7R3_d1464E_bfgMtVpA",
    authDomain: "eparcel-93886.firebaseapp.com",
    projectId: "eparcel-93886",
    storageBucket: "eparcel-93886.firebasestorage.app",
    messagingSenderId: "277995889860",
    appId: "1:277995889860:web:d5087ac555e37643e89591",
    measurementId: "G-YDB2Z8XHWL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { app, db, auth, storage };
