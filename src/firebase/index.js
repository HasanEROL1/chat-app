import { initializeApp } from "firebase/app";
// ! auth importu
import { getAuth, GoogleAuthProvider } from "firebase/auth"
//! database importu
import { getFirestore } from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxq-0cA45_tJTBJrHTlkl414MJuG7hm8M",
  authDomain: "chat-app-9d2c9.firebaseapp.com",
  projectId: "chat-app-9d2c9",
  storageBucket: "chat-app-9d2c9.firebasestorage.app",
  messagingSenderId: "1060324454119",
  appId: "1:1060324454119:web:f72e78f2f1a2490755fc42"
};

// ! Initialize Firebase
const app = initializeApp(firebaseConfig);

// authentication hizmetinin referansını al
export const auth = getAuth(app)

// ! google sağlayıcısının kurulumu

export const provider = new GoogleAuthProvider()

//! firestore (veritabanı) hizmetinin referansını al
export const db = getFirestore(app)