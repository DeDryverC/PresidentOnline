import React from 'react';
import { render } from '@testing-library/react';
import Game from './Game';
import { BrowserRouter as Router } from 'react-router-dom';
import { setGameInHistory } from '../../../../backend/model/history.model';

test('renders learn react link', () => {
  const { container } = render(
  <Router>
      <Game />);
 </Router>)
  container.querySelector('.Game') // Test classe 
  container.querySelector('.Row')
  container.querySelector('.Alert')
  container.querySelector('.Carte')
  container.querySelector('.Table')
  container.querySelector('.Number')
  container.querySelector('.Container')
});