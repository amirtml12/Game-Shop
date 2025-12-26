import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// ۱. این کتابخانه را ایمپورت کن
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ۲. کل اپلیکیشن را در این تگ محصور کن */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)