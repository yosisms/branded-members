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
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);

  const callUsersApi = () => {
    axios.get('/api/users')
    .then(response => {
      setUsers(response.data);
  })
  }

  useEffect(() => {
    callUsersApi();
  }, []);

  return (
    <div>
      <Router>
        <Header loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
        <Switch>
          <Route exact path='/' component={()=><Home loggedUser={loggedUser} />} />
          <Route exact path='/register' component={()=><Register loggedUser={loggedUser} callUsersApi={callUsersApi} />} />
          <Route exact path='/login' component={()=><Login loggedUser={loggedUser} setLoggedUser={setLoggedUser} />}  />
          <Route exact path='/members' component={()=><Members users={users} loggedUser={loggedUser} />} />
          <Route exact path='/about' component={()=><About />} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
