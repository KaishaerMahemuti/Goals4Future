// client/src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import { BrowserRouter } from 'react-router-dom';

// Import the AuthProvider
import { AuthProvider } from './AuthContext'; 
// ^ Adjust the relative path if AuthContext.js is in the same folder or a subfolder.

console.log("Index.js is running!");

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    {/* Wrap your entire app in AuthProvider */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
