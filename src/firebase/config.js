import { initializeApp } from "firebase/app";
import { initializeFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// Firebase config aqui embaixo
const firebaseConfig = {
    apiKey: "AIzaSyBYm0Y43taxexGDcurzA8wZEy0fgOcIfxY",
    authDomain: "genius-b0f27.firebaseapp.com",
    projectId: "genius-b0f27",
    storageBucket: "genius-b0f27.appspot.com",
    messagingSenderId: "632657239839",
    appId: "1:632657239839:web:4d8277095974d140339a2a"
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
