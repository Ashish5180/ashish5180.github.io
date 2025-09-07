import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Enhanced smooth initialization
document.addEventListener('DOMContentLoaded', () => {
  // Add smooth loading class to body
  document.body.classList.add('smooth-scroll');
});

// Smooth scroll polyfill for better browser support
import smoothscrollPolyfill from 'smoothscroll-polyfill';
smoothscrollPolyfill.polyfill();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
