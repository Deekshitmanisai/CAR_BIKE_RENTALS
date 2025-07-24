import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'; // or 'firebase/compat/firestore'
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQP9_rMNv6a47n9iqlqidERbZAeUX0Yd4",
  authDomain: "car-bike-rentals-28444.firebaseapp.com",
  databaseURL: "https://car-bike-rentals-28444-default-rtdb.firebaseio.com/", // Added for Realtime Database
  projectId: "car-bike-rentals-28444",
  storageBucket: "car-bike-rentals-28444.firebasestorage.app",
  messagingSenderId: "546282002112",
  appId: "1:546282002112:web:fe70ac59d8054a3bbc3f25",
  measurementId: "G-8LZWRS2SPW"
};

firebase.initializeApp(firebaseConfig);

export const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // or false if using Realtime Database
};

export default firebase;
