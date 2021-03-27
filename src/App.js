import './App.css';

import Navbar from './Components/Navbar';
import signup from './Components/singup';
import home from "./Components/home";
import login from "./Components/login";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' exact component={home}/>
        <Route path='/sign-up'  component={signup}/>
        <Route path='/signin'  component={login}/>
      </Switch>
    </Router>
  );
}

export default App;
