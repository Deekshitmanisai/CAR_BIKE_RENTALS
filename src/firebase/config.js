import firebase from 'firebase'
// import 'firebase/functions' // <- needed if using httpsCallable
 
const firebaseConfig = {
  apiKey: "AIzaSyCQP9_rMNv6a47n9iqlqidERbZAeUX0Yd4",
  authDomain: "car-bike-rentals-28444.firebaseapp.com",
  projectId: "car-bike-rentals-28444",
  storageBucket: "car-bike-rentals-28444.firebasestorage.app",
  messagingSenderId: "546282002112",
  appId: "1:546282002112:web:fe70ac59d8054a3bbc3f25",
  measurementId: "G-8LZWRS2SPW"
};
 
// Initialize firebase instance
firebase.initializeApp(firebaseConfig)
 
// Initialize other services on firebase instance
// firebase.functions() // <- needed if using httpsCallable
