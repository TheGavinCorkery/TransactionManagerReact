import './App.css';
import {Switch, Route} from 'react-router-dom';
import {useState} from 'react'
import Home from './components/Home/Home';
import Navbar from './components/NavBar/Navbar';
import Login from './components/Login/Login'

function App() {

  const [state, setState] = useState({})

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path = "/" exact component = {Home} />
        <Route path = "/login" render = {props => <Login {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
