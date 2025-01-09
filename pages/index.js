import Head from 'next/head';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { db, ref, set } from '../firebase';

export default function Home() {
  const [queueNumber, setQueueNumber] = useState(null);
  const [waitTime, setWaitTime] = useState(null);
  const [qrValue, setQrValue] = useState('');

  // สร้าง QR Code เมื่อโหลดหน้าเว็บ
  useEffect(() => {
    const baseUrl = window.location.origin;
    const qrData = `${baseUrl}/api/register`;
    setQrValue(qrData);
  }, []);

  return (
    <div>
      <Head>
        <title>ระบบรับคิว Photobooth</title>
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <main>
        <div className="container">
          <h1>สแกน QR Code เพื่อรับคิว</h1>
          <div className="qr-code">
            <QRCode value={qrValue} size={200} />
          </div>
          {queueNumber && (
            <div className="queue-info">
              <p>หมายเลขคิวของคุณ: {queueNumber}</p>
              <p>เวลารอคอยโดยประมาณ: {waitTime} นาที</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
