const database = getDatabase(app);

// ตัวแปรสำหรับเก็บข้อมูล
let totalQueue = 0;
let currentQueue = 0;
let waitTime = 0;

// Function สำหรับสร้าง QR Code ใหม่
function generateQRCode() {
@@ -30,37 +30,61 @@ function generateQRCode() {

// Function สำหรับเพิ่มคิวใหม่
function addQueue(type) {
  currentQueue++;
  const queueRef = ref(database, `queues/${currentQueue}`);
  totalQueue++;
  const queueRef = ref(database, `queues/${totalQueue}`);
  set(queueRef, {
    type: type,
    timestamp: new Date().toISOString()
  }).then(() => {
    alert(`เพิ่มคิวสำเร็จ! ลำดับคิวของคุณคือ ${currentQueue}`);
    alert(`เพิ่มคิวสำเร็จ! ลำดับคิวของคุณคือ ${totalQueue}`);
    updateQueueInfo();
  });
}

// Function สำหรับอัปเดตข้อมูลคิว
// Function สำหรับอัปเดตข้อมูลคิว (หน้า admin)
function updateQueueInfo() {
  const queueNumberElement = document.getElementById('queue-number');
  const waitTimeElement = document.getElementById('wait-time');
  const totalQueueElement = document.getElementById('total-queue');
  const currentQueueElement = document.getElementById('current-queue');
  totalQueueElement.textContent = totalQueue;
  currentQueueElement.textContent = currentQueue;
}

  queueNumberElement.textContent = currentQueue;
  waitTimeElement.textContent = Math.floor(currentQueue * 2); // คำนวณเวลารอคอย (ตัวอย่าง: 2 นาทีต่อคิว)
// Function สำหรับคำนวณเวลารอคอย (หน้า client)
function calculateWaitTime(queuePosition) {
  const waitTimeElement = document.getElementById('wait-time');
  const waitTime = queuePosition * 2; // คำนวณเวลารอคอย (ตัวอย่าง: 2 นาทีต่อคิว)
  waitTimeElement.textContent = `${waitTime} นาที`;
}

// Event listeners สำหรับปุ่มเลือกประเภทการถ่ายรูป
document.getElementById('single-photo').addEventListener('click', () => {
  addQueue('single');
});
// Event listeners สำหรับปุ่มเลือกประเภทการถ่ายรูป (หน้า client)
if (document.getElementById('single-photo')) {
  document.getElementById('single-photo').addEventListener('click', () => {
    addQueue('single');
    calculateWaitTime(totalQueue);
  });
}

document.getElementById('group-photo').addEventListener('click', () => {
  addQueue('group');
});
if (document.getElementById('group-photo')) {
  document.getElementById('group-photo').addEventListener('click', () => {
    addQueue('group');
    calculateWaitTime(totalQueue);
  });
}

// สร้าง QR Code ใหม่ทุก 1 นาที
setInterval(generateQRCode, 60000);
// สร้าง QR Code ใหม่ทุก 1 นาที (หน้า admin)
if (document.getElementById('qr-code')) {
  setInterval(generateQRCode, 60000);
  generateQRCode();
}

// เริ่มต้นสร้าง QR Code ครั้งแรก
generateQRCode();
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
