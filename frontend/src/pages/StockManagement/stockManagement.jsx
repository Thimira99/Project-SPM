import React, { Component } from 'react';
import StockNavbar from '../../components/StockNavBar';
import TopBar from '../../components/Topbar';
import axios from 'axios'
import stockManagementStyles from './stockManagement.module.scss';
export default class stockManagement extends Component{
    constructor(props){
        super(props);

        this.state={
            stocks:[]
        };
    }

    componentDidMount(){
        this.retrieveStocks();
    }

    retrieveStocks(){
        axios.get("http://localhost:8000/retrieve/stocks").then(res=>{
            if(res.data.success){
                this.setState({
                    stocks:res.data.existingStocks
                });
                console.log(this.state.stocks)
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
    return(
        
        <>
            <TopBar />
            <div className={stockManagementStyles.main}>
                <StockNavbar/>
                <h1>Stock Management</h1>
            </div>
        </>
    )
  }
}