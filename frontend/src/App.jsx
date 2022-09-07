import './App.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import CreateEmployee from './pages/createEmployee/CreateEmployee';
import stockManagement from './pages/StockManagement/stockManagement';
import createStocks from './pages/StockManagement/createStocks';
import requestStocks from './pages/StockManagement/requestStocks';
import createRequestStocks from './pages/StockManagement/createRequestStocks';
import dashboard from './pages/SalesManeger/Dashboard/dashboard';
import createShop from './pages/SalesManeger/Shops/CreateShop/createShop';


import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import TopBar from './components/Topbar';



function App() {
  return (
    <>
      <Router>
        <TopBar />

        <div className='main-wrapper'>
          <div className='main-body'>
            <Switch>
              <Route path='/mainPage' component={Dashboard} />
              <Route path='/createEmployee' component={CreateEmployee} />

              <Route path='/stockManagement' component={stockManagement} />
              <Route path='/reqStocks' component={requestStocks} />
              <Route path='/createStocks' component={createStocks} />
              <Route path='/createRequests' component={createRequestStocks} />

              {/* sales Person Link */}
              <Route path='/salesPerson' component={dashboard} />
              <Route path='/createShop' component={createShop} />


              <Route path='/login' component={Login} />
              <Redirect from='/' to='/login' />
            </Switch>
          </div>
        </div>
      </Router>

    </>
  );
}

export default App;
