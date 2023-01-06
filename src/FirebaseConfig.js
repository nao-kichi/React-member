// firebaseアプリのURL部分となる。

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 追加しました。

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// プロダクトSDK
const firebaseConfig = {
    apiKey: "AIzaSyAykNoRSK2WU8oPCNGIGNt8Iag21jHcLxk",
    authDomain: "react-firestore-299fa.firebaseapp.com",
    projectId: "react-firestore-299fa",
    storageBucket: "react-firestore-299fa.appspot.com",
    messagingSenderId: "1039851625962",
    appId: "1:1039851625962:web:73ae854f72253105e3a693"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authの追加
export const auth = getAuth(app);
export const db = getFirestore(app)