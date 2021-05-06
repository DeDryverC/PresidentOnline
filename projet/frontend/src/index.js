import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import background from './img/bg_dark.webp'
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <div style={{
    backgroundImage: `url(${background})`,
    height: '100%',
    margin: 0,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
  }}>
    <Router>
      <div>
        <App />
      </div>
    </Router>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
