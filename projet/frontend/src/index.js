import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import background from './Navbar/images/bg_dark.webp'
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <div style={{
      backgroundImage : `url(${background})`, height:1000,
      backgroundRepeat: 'repeat',
      }}>
        <App />
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
