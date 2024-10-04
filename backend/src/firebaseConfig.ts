import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAX6rN7TEbNxZnJ4wHb2VlRfoHRy4j_Dvo",
  authDomain: "inair-842b0.firebaseapp.com",
  projectId: "inair-842b0",
  storageBucket: "inair-842b0.appspot.com",
  messagingSenderId: "809767522522",
  appId: "1:809767522522:web:898d16aad4b480352c95e3"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);


export { firestore };