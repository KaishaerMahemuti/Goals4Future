// client/src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './styles/main.css'; // Optional: include your main styles here
import { BrowserRouter } from 'react-router-dom';

console.log("Index.js is running!"); // Debug log

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
class index {
    
}