// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA5c5nHaw6s1X1quiybFD_zq7vB4tIfIVQ",
  authDomain: "eventcost-pro.firebaseapp.com",
  databaseURL: "https://eventcost-pro-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "eventcost-pro",
  storageBucket: "eventcost-pro.firebasestorage.app",
  messagingSenderId: "114353067568",
  appId: "1:114353067568:web:1b444a5cb44d0f73e8bff5"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database }; // Export database เพื่อใช้งานในไฟล์อื่น
