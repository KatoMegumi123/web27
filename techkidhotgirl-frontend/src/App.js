import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import UserScreen from './pages/UserScreen';
import SignUpScreen from './pages/SignUpScreen';
import HomePageScreen from './pages/HomPageScreen';
import NotFoundScreen from './pages/NotFoundScreen';
import UploadScreen from './pages/UploadScreen';

function App() {
  return (
    <div>
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route path='/' component={HomePageScreen} exact={true}></Route>
            <Route path='/upload' component={UploadScreen}></Route>
            <Route path='/login' component={LoginScreen}></Route>
            <Route path='/signup' component={SignUpScreen}></Route>
            <Route path='/current-user' component={UserScreen}></Route>
            <Route component={NotFoundScreen}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
