import appStyles from './App.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar.jsx';
import Login from './login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import CreateEmployee from './pages/createEmployee/CreateEmployee';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/mainPage' component={Dashboard} />
          <Route path='/createEmployee' component={CreateEmployee} />


          <Redirect from='/' to='/login' component={Login} />
        </Switch>
      </Router>

    </>
  );
}

export default App;
