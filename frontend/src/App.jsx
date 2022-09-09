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
import allShops from './pages/SalesManeger/Shops/AllShops/allShops';
// import SupplierList from './pages/ProductManeger/Suppliers/SupplierList/SupplierList';
import ProductManagerDashboard from './pages/ProductManager/Dashboard/dashboard';
import distributions from './pages/DistributionManagement/distribution'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import TopBar from './components/Topbar';
import UpdateUser from './pages/admin/UpdateAdmin/updateUser';
import requestedStocks from './pages/DistributionManagement/requestedStocks'
import regCompany from './pages/DistributionManagement/regCompanies'
import companies from './pages/DistributionManagement/companies'
import createDistributions from './pages/DistributionManagement/createDistributions';
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
              <Route path='/updateEmployee' component={UpdateUser} />

              {/* Stock manager Links */}
              <Route path='/stockManagement' component={stockManagement} />
              <Route path='/reqStocks' component={requestStocks} />
              <Route path='/createStocks' component={createStocks} />
              <Route path='/createRequests' component={createRequestStocks} />

              {/* Distribution manager Link */}
              <Route path='/distributions' component={distributions} />
              <Route path='/requestedStocks' component={requestedStocks} />
              <Route path='/regCompany' component={regCompany} />
              <Route path='/companies' component={companies} />
              <Route path='/regDistributions' component={createDistributions} />

              {/* sales Person Link */}
              <Route path='/salesPerson' component={dashboard} />
              <Route path='/createShop' component={createShop} />
              <Route path='/allShops' component={allShops} />

               {/* Product Manager Link */}
               <Route path='/productManager' component={ProductManagerDashboard} />
              {/* <Route path='/supplierList' component={SupplierList} /> */}

              <Route path='/login' component={Login} />
              <Redirect from='/' to='/login' />
            </Switch>

            <ToastContainer position="top-center"
              autoClose={2000}
              hideProgressBar={false} />
          </div>
        </div>
      </Router>

    </>
  );
}

export default App;
