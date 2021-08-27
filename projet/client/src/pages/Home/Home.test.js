import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders learn react link', () => {
  const { container } = render(
  <Router>
      <Home />);
 </Router>)

container.querySelector('.Home')
container.querySelector('.Alert.Heading')
container.querySelector('.Object')
container.querySelector('.Container')


});