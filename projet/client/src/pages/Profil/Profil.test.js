import React from 'react';
import { render } from '@testing-library/react';
import Profil from './Profil';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders learn react link', () => {
  const { container } = render(
  <Router>
      <Profil />);
 </Router>)
  

  container.querySelector('.Profil')
  container.querySelector('.NavigationProfil')
  container.querySelector('.Button')
  container.querySelector('.CookieConsent')

});