import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders learn react link', () => {
  const { container } = render(
  <Router>
      <App />);
 </Router>)
  container.querySelector('.Switch')
  container.querySelector('.Route')
  container.querySelector('.Navigation')
  container.querySelector('.Profil')
  container.querySelector('.Historique')
  container.querySelector('.Jeu')
  container.querySelector('.Signin')
  container.querySelector('.Login')
  container.querySelector('.Rules')
  container.querySelector('.Howto')
  container.querySelector('.Game')
});