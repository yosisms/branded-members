import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import './sass/main.scss';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Members from './components/pages/Members';
import About from './components/pages/About';
import Header from './components/Header';

const App = () => {
  const [loggedUser, setLoggedUser] = useState(false)

  const logUser = () => {
    axios.post('/checkAuthentication')
      .then(res => {
        setLoggedUser(res.data.authenticated);
      })
      .catch((error) => {
        setLoggedUser(false)
    });
  }

  useEffect(() => {
    logUser();
}, []);

  return (
    <div>
      <Router>
        <Header loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
        <Switch>
          <Route exact path='/' component={()=><Home loggedUser={loggedUser} />} />
          <Route exact path='/register' component={()=><Register loggedUser={loggedUser} logUser={logUser} />} />
          <Route exact path='/login' component={()=><Login loggedUser={loggedUser} logUser={logUser} />}  />
          <Route exact path='/members' component={()=><Members loggedUser={loggedUser} />} />
          <Route exact path='/about' component={()=><About />} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
