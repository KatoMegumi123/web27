import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateGameScreen from './pages/CreateGameScreen';
import GameDetailScreen from './pages/GameDetailScreeen';
import NotFoundScreen from './pages/NotFoundScreen';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={CreateGameScreen} exact={true}></Route>
        <Route path='/games/:gameId' component={GameDetailScreen}></Route>
        <Route component={NotFoundScreen}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
