import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders learn react link', () => {
  const { container } = render(
  <Router>
      <Login />);
 </Router>)
 

 container.querySelector('.Signin')
 container.querySelector('.NavigationAutres')
 container.querySelector('.CookieConsent')


});