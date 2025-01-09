// Import Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5c5nHaw6s1X1quiybFD_zq7vB4tIfIVQ",
  authDomain: "eventcost-pro.firebaseapp.com",
  databaseURL: "https://eventcost-pro-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "eventcost-pro",
  storageBucket: "eventcost-pro.firebasestorage.app",
  messagingSenderId: "114353067568",
  appId: "1:114353067568:web:1b444a5cb44d0f73e8bff5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ตัวแปรสำหรับเก็บข้อมูล
let currentQueue = 0;
let waitTime = 0;

// Function สำหรับสร้าง QR Code ใหม่
function generateQRCode() {
  const qrCodeElement = document.getElementById('qr-code');
  const randomCode = Math.random().toString(36).substring(7); // สร้างรหัสสุ่ม
  qrCodeElement.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${randomCode}`;
}

// Function สำหรับเพิ่มคิวใหม่
function addQueue(type) {
  currentQueue++;
  const queueRef = ref(database, `queues/${currentQueue}`);
  set(queueRef, {
    type: type,
    timestamp: new Date().toISOString()
  }).then(() => {
    alert(`เพิ่มคิวสำเร็จ! ลำดับคิวของคุณคือ ${currentQueue}`);
    updateQueueInfo();
  });
}

// Function สำหรับอัปเดตข้อมูลคิว
function updateQueueInfo() {
  const queueNumberElement = document.getElementById('queue-number');
  const waitTimeElement = document.getElementById('wait-time');

  queueNumberElement.textContent = currentQueue;
  waitTimeElement.textContent = Math.floor(currentQueue * 2); // คำนวณเวลารอคอย (ตัวอย่าง: 2 นาทีต่อคิว)
}

// Event listeners สำหรับปุ่มเลือกประเภทการถ่ายรูป
document.getElementById('single-photo').addEventListener('click', () => {
  addQueue('single');
});

document.getElementById('group-photo').addEventListener('click', () => {
  addQueue('group');
});

// สร้าง QR Code ใหม่ทุก 1 นาที
setInterval(generateQRCode, 60000);

// เริ่มต้นสร้าง QR Code ครั้งแรก
generateQRCode();
