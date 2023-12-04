// import { initializeApp } from 'firebase/app';

// import firebase from 'firebase/app';
// import 'firebase/firestore';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {

  // Add Firebase Config Here


//Intialize Firebase

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}


export { firebase }