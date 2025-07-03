import React from 'react';
import { createRoot } from 'react-dom/client';

const Options: React.FC = () => (
  <div style={{ padding: 24, fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif' }}>
    <h2>SendShield Settings</h2>
    <p>Configure your default send delay and other preferences here.</p>
    {/* TODO: Add settings form */}
  </div>
);

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<Options />);
}
export {}; 