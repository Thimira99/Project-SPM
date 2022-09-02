import React, { Component } from 'react';
import StockNavbar from '../../components/StockNavBar';
import TopBar from '../../components/Topbar';
import axios from 'axios'
import stockManagementStyles from './stockManagement.module.scss';
import { MDBDataTable } from 'mdbreact';

export default class requestStocks extends Component{
    constructor(props){
        super(props);

        this.state={
            reqStocks:[]
        };
    }

    componentDidMount(){
        this.retrieveReqStocks();
    }

    retrieveReqStocks(){
        axios.get("http://localhost:8000/retrieve/request/stocks").then(res=>{
            if(res.data.success){
                this.setState({
                    reqStocks:res.data.existingReqStocks
                });
                console.log(this.state.reqStocks)
            }
        });
    }

    onDelete = (id) => {
        if (window.confirm("Do you want to remove this request?")) {
          axios.delete(`http://localhost:8000/request/stocks/delete/${id}`).then((res) => {
            alert("Request removed Successfully!");
            this.retrieveReqStocks();
          });
        }
      };

//Search bar
  // filterData(stocks, searchKey) {
  //   const result = stocks.filter(
  //     (item) =>
  //       item.product_id.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
  //       item.product_id.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
  //       item.product_type.toUpperCase().includes(searchKey) ||
  //       item.product_type.toLowerCase().includes(searchKey) ||
  //       item.product_name.toUpperCase().includes(searchKey) ||
  //       item.product_name.toLowerCase().includes(searchKey) ||
  //       item.status.toUpperCase().includes(searchKey) ||
  //       item.status.toLowerCase().includes(searchKey) 
  //   );

  //   this.setState({ stocks: result });
  // }

  // handleSearchArea = (e) => {
  //   const searchKey = e.currentTarget.value;

  //   axios.get("http://localhost:8000/retrieve/stocks").then((res) => {
  //     if (res.data.success) {
  //       this.filterData(res.data.existingStocks, searchKey);
  //     }
  //   });
  // };


  render() {
    return(
        
        <>
            <TopBar />
            <div className={stockManagementStyles.main}>
                <StockNavbar/>
                <h1 style={{
                  marginLeft:'450px',
                  marginTop:'20px'
                }}>REQUESTED STOCKS</h1>
               

              <div className={stockManagementStyles.button}>
                <button style={{
                  marginTop:"80px", 
                  marginLeft:"-700px", 
                  backgroundColor:"#287BD4", 
                  border:"none", 
                  color:'white', 
                  fontWeight:"bold",
                  height:"50px"
                  }}><a href="/createRequests"
                    style={{
                      textDecoration:'none',
                      color:'white'
                    }}
                  >
                    Create Requests
                  </a></button>
              </div>
              
              </div>
            
              
        </>
    )
  }
}