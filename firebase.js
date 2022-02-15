import * as firebase from "@firebase/app";
require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');
//import { initializeApp } from 'firebase/app';
//import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
//import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// const auth = firebase.auth();
// auth.signInAnonymously(auth)
//   .then(() => {
//     console.log("to hackeando");
//   })
//   .catch((error) => {
//     console.log(error);
//     // ...
//   });

//   var firebaseConfig = {};

  // auth.onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;

  //     firebaseConfig = {
  //       apiKey: 'AIzaSyAAu56wNnQuSBmGHe-kvVmoBGkf59vt3HE',
  //       authDomain: 'amicusco-a26ea.firebaseapp.com',
  //       databaseURL: 'https://amicusco-a26ea-default-rtdb.firebaseio.com',
  //       projectId: 'amicusco-a26ea',
  //       storageBucket: 'amicusco-a26ea.appspot.com',
  //       messagingSenderId: '282693738174',
  //       appId: uid,
  //     };
  //   } else {
  //     console.log("olá");
  //   }
  // });

  const firebaseConfig = {
    apiKey: 'AIzaSyAAu56wNnQuSBmGHe-kvVmoBGkf59vt3HE',
    authDomain: 'amicusco-a26ea.firebaseapp.com',
    databaseURL: 'https://amicusco-a26ea-default-rtdb.firebaseio.com',
    projectId: 'amicusco-a26ea',
    storageBucket: 'amicusco-a26ea.appspot.com',
    messagingSenderId: '282693738174'
  }
// Initialize Firebase
firebase.default.initializeApp(firebaseConfig);
const db = firebase.default.storage();
export { db };