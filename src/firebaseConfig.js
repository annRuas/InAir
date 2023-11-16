import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDjSX4km6z5yrFJnV8vVxAOEQoad4NJkK4",
  authDomain: "inair-2a256.firebaseapp.com",
  projectId: "inair-2a256",
  storageBucket: "inair-2a256.appspot.com",
  messagingSenderId: "809767522522",
  appId: "1:809767522522:web:898d16aad4b480352c95e3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(app);
export const firestoreDb = getFirestore(app);


//export { auth };

