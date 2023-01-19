import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {ChatRoom} from "./pages/ChatRoom/ChatRoom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChatRoom />
  </React.StrictMode>
);

reportWebVitals();
