import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const DELAY_OPTIONS = [15, 30, 60, 120];

const Options: React.FC = () => {
  const [delay, setDelay] = useState<number>(60);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(['delaySeconds'], result => {
      setDelay(result.delaySeconds || 60);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDelay(Number(e.target.value));
    setSaved(false);
  };

  const handleSave = () => {
    chrome.storage.sync.set({ delaySeconds: delay }, () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 32, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif' }}>
      <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 16 }}>SendShield Settings</h2>
      <label style={{ fontWeight: 500, fontSize: 16, marginBottom: 8, display: 'block' }}>
        Default Send Delay
      </label>
      <select value={delay} onChange={handleChange} style={{ fontSize: 16, padding: '8px 16px', borderRadius: 8, border: '1px solid #e5e7eb', marginBottom: 24, width: '100%' }}>
        {DELAY_OPTIONS.map(opt => (
          <option key={opt} value={opt}>{opt === 120 ? '2 minutes' : `${opt} seconds`}</option>
        ))}
      </select>
      <button onClick={handleSave} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer', width: '100%' }}>
        Save
      </button>
      {saved && <div style={{ color: '#22c55e', marginTop: 16, fontWeight: 500 }}>Saved!</div>}
      <div style={{ marginTop: 32, color: '#6b7280', fontSize: 14 }}>
        <strong>Privacy:</strong> No email content is ever stored. Only your delay preference is saved locally.
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<Options />);
}
export {}; 