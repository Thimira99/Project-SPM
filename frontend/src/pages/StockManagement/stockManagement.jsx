import React, { Component } from 'react';
import StockNavbar from '../../components/StockNavBar';
import TopBar from '../../components/Topbar';
import axios from 'axios'
import stockManagementStyles from './stockManagement.module.scss';
//import { MDBDataTable } from 'mdbreact';

export default class stockManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stocks: []
    };
  }

  componentDidMount() {
    this.retrieveStocks();
  }

  retrieveStocks() {

    axios.get("http://localhost:8000/retrieve/stocks").then(res => {
      console.log("resData", res.data.data)
      if (res.data.success) {
        this.setState({
          stocks: res.data.data
        }, () => {
          console.log("res", this.state.stocks)
          this.state.stocks.map(x =>
            console.log("x value", x))
        });

      }
    });
  }

  onDelete = (id) => {
    if (window.confirm("Do you want to remove this stock?")) {
      axios.delete(`http://localhost:8000/stocks/delete/${id}`).then((res) => {
        alert("Stock removed Successfully!");
        this.retrieveStocks();
      });
    }
  };

  //Search bar
  filterData(stocks, searchKey) {
    const result = stocks.filter(
      (item) =>
        item.product_id.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
        item.product_id.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
        item.product_type.toUpperCase().includes(searchKey) ||
        item.product_type.toLowerCase().includes(searchKey) ||
        item.product_name.toUpperCase().includes(searchKey) ||
        item.product_name.toLowerCase().includes(searchKey) ||
        item.status.toUpperCase().includes(searchKey) ||
        item.status.toLowerCase().includes(searchKey)
    );

    this.setState({ stocks: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/retrieve/stocks").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingStocks, searchKey);
      }
    });
  };


  render() {
    return (

      <>
        <div className={stockManagementStyles.main}>
          <StockNavbar />
          <h1 style={{
            marginLeft: '450px',
            marginTop: '20px'
          }}>Stock Management</h1>


          <div className={stockManagementStyles.button}>
            <button style={{
              marginTop: "80px",
              marginLeft: "-700px",
              backgroundColor: "#287BD4",
              border: "none",
              color: 'white',
              fontWeight: "bold",
              height: "50px"
            }}><a href="/createStocks"
              style={{
                textDecoration: 'none',
                color: 'white'
              }}
            >
                Create stocks
              </a></button>
          </div>
          <div>
            <table className="table table-hover"
              style={{
                marginTop: '200px',
                marginLeft: '-500px',
                backgroundColor: "#ffff",
                borderRadius: "5px",
                width: "100%",
                //border: "none",
              }}>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>PRODUCT ID</th>
                  <th scope='col'>PRODUCT TYPE</th>
                  <th scope='col'>PRODUCT NAME</th>
                  <th scope='col'>REGULAR PRICE</th>
                  <th scope='col'>STATUS</th>
                  <th scope='col'>STOCK COUNT</th>
                </tr>
              </thead>
              <tbody>
                {this.state.stocks.map((stocks, index) => (
                  <tr>
                    <th scope='row'>{index + 1}</th>
                    <td>
                      {stocks.product_id}
                    </td>
                    <td>{stocks.product_type}</td>
                    <td>{stocks.product_name}</td>
                    <td>{stocks.regular_price}</td>
                    <td>{stocks.status}</td>
                    <td>{stocks.stock_count}</td>
                    <td>
                      <a className='btn btn-warning' href={`/edit/stocks/${stocks._id}`} style={{ color: 'black' }}>
                        <i className='fas fa-edit'></i>
                        &nbsp;EDIT
                      </a>
                      &nbsp;
                      <a className="btn btn-danger" href="#" onClick={() => this.onDelete(stocks._id)} style={{ textDecoration: "none", color: "white" }}
                      >
                        <i className='fas fa-trash-alt'></i>
                        &nbsp;REMOVE
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>


            </table>
          </div>
        </div>


      </>
    )
  }
}