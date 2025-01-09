import { db, ref, set, get, update } from '../firebase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { type } = req.body; // ประเภทการถ่ายรูป (เดี่ยวหรือคู่)

    try {
      // นับจำนวนคิวทั้งหมด
      const queueRef = ref(db, 'queues');
      const snapshot = await get(queueRef);
      const totalQueue = snapshot.size;

      // สร้างคิวใหม่
      const newQueueNumber = totalQueue + 1;
      const newQueueRef = ref(db, `queues/${newQueueNumber}`);
      await set(newQueueRef, {
        type: type,
        timestamp: new Date().toISOString(),
        status: 'waiting'
      });

      // คำนวณเวลารอคอย
      const waitTime = newQueueNumber * 2; // ตัวอย่าง: 2 นาทีต่อคิว

      // ส่งข้อมูลคิวกลับไปยังลูกค้า
      res.status(200).json({
        queueNumber: newQueueNumber,
        waitTime: waitTime
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลงทะเบียนคิว' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
