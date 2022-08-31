// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1Idopfp0A_kUmUDVJebF8yoSYNutsS90",
  authDomain: "lebreakfood.firebaseapp.com",
  projectId: "lebreakfood",
  storageBucket: "lebreakfood.appspot.com",
  messagingSenderId: "594795987243",
  appId: "1:594795987243:web:a36d9ca9c054eae826056e"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };

