// Content script for Email Magic: SendShield
// TODO: Intercept Gmail's Send button, apply delay logic, and show UI feedback.

import { GmailDelay, getDelaySettings } from './gmailDelay';

(async () => {
  if (!window.location.hostname.includes('mail.google.com')) return;
  const settings = await getDelaySettings();
  const delay = new GmailDelay(settings);
  delay.start();
  console.log('Email Magic: SendShield content script initialized.');
})(); 