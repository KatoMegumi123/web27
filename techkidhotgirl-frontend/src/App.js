import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import UserScreen from './pages/UserScreen';
import SignUpScreen from './pages/SignUpScreen';
import HomePageScreen from './pages/HomPageScreen';
import NotFoundScreen from './pages/NotFoundScreen';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={HomePageScreen} exact={true}></Route>
          <Route path='/login' component={LoginScreen}></Route>
          <Route path='/signup' component={SignUpScreen}></Route>
          <Route path='/curren-user' component={UserScreen}></Route>
          <Route component={NotFoundScreen}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
