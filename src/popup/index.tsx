import React from 'react';
import { createRoot } from 'react-dom/client';

const Popup: React.FC = () => (
  <div style={{ padding: 16, fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif' }}>
    <h2>Email Magic: SendShield</h2>
    <p>Smart delay send for Gmail is active.</p>
  </div>
);

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<Popup />);
}
export {}; 