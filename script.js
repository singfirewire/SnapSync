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
let totalQueue = 0;
let currentQueue = 0;

// Function สำหรับสร้าง QR Code ใหม่
function generateQRCode() {
  const qrCodeElement = document.getElementById('qr-code');
  const randomCode = Math.random().toString(36).substring(7); // สร้างรหัสสุ่ม
  qrCodeElement.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${randomCode}`;
}

// Function สำหรับเพิ่มคิวใหม่
function addQueue(type) {
  totalQueue++;
  const queueRef = ref(database, `queues/${totalQueue}`);
  set(queueRef, {
    type: type,
    timestamp: new Date().toISOString()
  }).then(() => {
    alert(`เพิ่มคิวสำเร็จ! ลำดับคิวของคุณคือ ${totalQueue}`);
    updateQueueInfo();
  });
}

// Function สำหรับอัปเดตข้อมูลคิว (หน้า admin)
function updateQueueInfo() {
  const totalQueueElement = document.getElementById('total-queue');
  const currentQueueElement = document.getElementById('current-queue');

  totalQueueElement.textContent = totalQueue;
  currentQueueElement.textContent = currentQueue;
}

// Function สำหรับคำนวณเวลารอคอย (หน้า client)
function calculateWaitTime(queuePosition) {
  const waitTimeElement = document.getElementById('wait-time');
  const waitTime = queuePosition * 2; // คำนวณเวลารอคอย (ตัวอย่าง: 2 นาทีต่อคิว)
  waitTimeElement.textContent = `${waitTime} นาที`;
}

// Event listeners สำหรับปุ่มเลือกประเภทการถ่ายรูป (หน้า client)
if (document.getElementById('single-photo')) {
  document.getElementById('single-photo').addEventListener('click', () => {
    addQueue('single');
    calculateWaitTime(totalQueue);
  });
}

if (document.getElementById('group-photo')) {
  document.getElementById('group-photo').addEventListener('click', () => {
    addQueue('group');
    calculateWaitTime(totalQueue);
  });
}

// สร้าง QR Code ใหม่ทุก 1 นาที (หน้า admin)
if (document.getElementById('qr-code')) {
  setInterval(generateQRCode, 60000);
  generateQRCode();
}

// อัปเดตข้อมูลคิวแบบ Real-time (หน้า admin)
if (document.getElementById('total-queue')) {
  const queueRef = ref(database, 'queues');
  onValue(queueRef, (snapshot) => {
    const data = snapshot.val();
    totalQueue = Object.keys(data || {}).length;
    currentQueue = totalQueue; // ตัวอย่าง: คิวปัจจุบันคือคิวสุดท้าย
    updateQueueInfo();
  });
}
