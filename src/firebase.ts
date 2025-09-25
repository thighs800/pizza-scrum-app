// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFAg9hjP-ZZAummjmh2Di1FJEGBKsuOa4",
  authDomain: "pizza-scrum-app.firebaseapp.com",
  projectId: "pizza-scrum-app",
  storageBucket: "pizza-scrum-app.firebasestorage.app",
  messagingSenderId: "324612978073",
  appId: "1:324612978073:web:b95fc4d6a57c6dd0c00f08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 認証サービス（Firebase Authentication）を初期化
const auth = getAuth(app);

// データベースサービス（Firestore（）を初期化
const db = getFirestore(app);

// 必要なサービスをすべてエクスポート
export {app, auth, db};