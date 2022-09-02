import appStyles from './App.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar.jsx';
import Home from './pages/Home/Home';
import Login from './login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import CreateEmployee from './pages/createEmployee/CreateEmployee';
import stockManagement from './pages/StockManagement/stockManagement';
import createStocks from './pages/StockManagement/createStocks';
import requestStocks from './pages/StockManagement/requestStocks';
import createRequestStocks from './pages/StockManagement/createRequestStocks';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>

          <Route path='/login' component={Login} />
          <Route path='/mainPage' component={Dashboard} />
          <Route path='/createEmployee' component={CreateEmployee} />

          <Route path ='/stockManagement' component={stockManagement}/>
          <Route path = '/reqStocks' component ={requestStocks}/>
          <Route path ='/createStocks' component={createStocks}/>
          <Route path ='/createRequests' component={createRequestStocks}/>
          <Redirect from='/' to='/login' component={Login} />
        </Switch>
      </Router>

    </>
  );
}

export default App;
