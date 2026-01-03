import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes'; // <--- Import the Dark Theme

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Key");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      appearance={{
        baseTheme: dark, // <--- Apply the Dark Theme here
        variables: { 
          colorPrimary: '#3b82f6', // Keep your Blue-500 accent
          colorBackground: '#0f172a', // Match your Slate-900 background
          colorText: 'white', // Ensure main text is white
          colorTextSecondary: '#94a3b8' // Make secondary text (like emails) light gray
        }
      }}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>,
);