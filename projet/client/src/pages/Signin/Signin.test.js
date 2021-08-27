import React from 'react';
import { render } from '@testing-library/react';
import Signin from './Signin';
import { BrowserRouter as Router } from 'react-router-dom';
import {screen, getByLabelText} from '@testing-library/react'


test('renders learn react link', () => {
  const {  container } = render(
  <Router>
      <Signin />);
 </Router>)

  container.querySelector('.Signin') // Test classe 
  container.querySelector('.NavigationAutres')
  container.querySelector('.Container')
  container.querySelector('.CookieConsent')

});


/*
test('render screen', () => {
    const { getByLabelText } = render(
    <Router>
        <Signin />);
   </Router>)
  
    const linkElement = screen.getByLabelText('Name');
    expect(linkElement).toBeInTheDocument();
  
  
  });

*/