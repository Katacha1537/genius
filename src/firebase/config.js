import { initializeApp } from "firebase/app";
import { initializeFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// Firebase config aqui embaixo
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC__FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC__FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC__FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC__FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC__FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC__FIREBASE_APPID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
const db = initializeFirestore(firebaseApp, {
    ignoreUndefinedProperties: true,
});
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

// Timestamp
const timestamp = serverTimestamp();

export { db, auth, storage, timestamp };
