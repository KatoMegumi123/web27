import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import CreatQuestionScreen from './pages/CreatQuestionScreen';
import SearchScreen from './pages/SearchScreen';
import NotFoundScreen from './pages/NotFoundScreen';
import QuestionDetailScreen from './pages/QuestionDetailScreen';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={HomeScreen} exact={true}></Route>
          <Route path='/questions/:questionId' component={QuestionDetailScreen}></Route>
          <Route path='/creat-question' component={CreatQuestionScreen}></Route>
          <Route path='/search' component={SearchScreen}></Route>
          <Route component={NotFoundScreen}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
