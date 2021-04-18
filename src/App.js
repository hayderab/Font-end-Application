import './App.css';
import React, { Component } from 'react'
import { Layout } from 'antd';
import Navbar from './Components/Navbar';
import signup from './Components/singup';
import home from "./Components/home";
import login from "./Components/login";
import addDogs from "./Components/addDogs"
import favView from "./Components/favourites/favView"

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserContext from './contexts/user';

const { Header, Content, Footer } = Layout;
export class App extends Component {

  constructor(props) {
    super(props);
    // this.login();
    this.state = {
      user: { loggedIn: false }
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    this.login();
  }
  login() {
    console.log("User is now being set on the context");
    // console.log("getting user data from state", user)
    console.log("this is the database")
    fetch('http://localhost:5000/api/auth/logedin', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(user => {
        // console.log(user.sigupcode);
        console.log("user Loged in", user);
        if (user.sigupcode == true && user.login == true) {
          console.log("user Loged in", true);
          this.state.user = { loggedIn: true }
          this.setState({
            user: {
              sigupcode: true,
              loggedIn: true
            }
          });
        } else if (user.login == true) {
          this.state.user = { loggedIn: true }
          this.setState({
            user: {
              sigupcode: false,
              loggedIn: true
            }
          })
        } else {
          this.state.user = { loggedIn: true }
          this.setState({
            user: {
              sigupcode: false,
              loggedIn: false
            }
          });
        }
      })
      .catch(error => {
        // TODO: show nicely formatted error message
        console.log('checkin user loged in error.');
      });
  }
  logout() {
    fetch('http://localhost:5000/api/auth/logout', {
      credentials: 'include',
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(user => {
        console.log('logout sucessfull');
        console.log("deleting Cookie");
        this.setState({ user: { loggedIn: false } });
      })
      .catch(error => {
        // TODO: show nicely formatted error message
        console.log('deleting cookie..... ');
      });
  }
  render() {
    const context = {
      user: this.state.user,
      login: this.login,
      logout: this.logout
    };
    return (
      <UserContext.Provider value={context}>
        <Router>
          <Navbar />
          <Content>
            <Route path='/' exact component={home} />
            <Route path='/add' component={addDogs} />
            {/* <Route path='/add' children={addDogs} /> */}
            <Route path='/sign-up' component={signup} />
            <Route path='/signin' component={login} />
            <Route path='/favourite' component={favView} />
            {/* <Route path='/logout'/> */}
          </Content>
        </Router>
      </UserContext.Provider>
    );
  }
}

export default App
