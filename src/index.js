import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ToDoContainer from './Components/ToDoContainer/ToDoApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToDoContainer />
  </React.StrictMode>,
);
