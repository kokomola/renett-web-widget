import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Renett from './App';
import reportWebVitals from './reportWebVitals';


window.Renett = options => {
  ReactDOM.render(
    <React.StrictMode>
      <Renett />
    </React.StrictMode>,
    document.getElementById(options.elementId)
  );
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
