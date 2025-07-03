# Email Magic: SendShield – Gmail Extension

## Overview
Email Magic: SendShield is a Chrome Extension for Gmail that introduces a smart, customizable delay before sending emails. It helps prevent mistakes and rushed decisions, with a premium, non-intrusive user experience.

## Features
- Intercepts Gmail's Send event and applies a configurable delay
- Visual feedback with a modern icon and countdown
- User-customizable delay duration
- Outbox functionality for cancel/edit during delay
- Google OAuth authentication and license verification
- Anonymized usage tracking (no email content stored)
- Enterprise-grade security and privacy

## Tech Stack
- Chrome Extension (Manifest V3)
- TypeScript
- React (for UI)
- Firebase/Supabase (for backend license/auth)

## Getting Started
1. `npm install` – Install dependencies
2. `npm run dev` – Start development build (watches for changes)
3. Load the `dist/` folder as an unpacked extension in Chrome

## Project Structure
- `src/` – Source code
  - `content/` – Content scripts (Gmail integration)
  - `background/` – Background scripts
  - `popup/` – Popup UI
  - `options/` – Settings/options page
  - `assets/` – Icons, images, etc.
- `public/` – Static files
- `dist/` – Build output

## License & Ownership
All code and assets are the exclusive property of the client upon delivery and payment.

---
For more details, see the project overview or contact the maintainer. 