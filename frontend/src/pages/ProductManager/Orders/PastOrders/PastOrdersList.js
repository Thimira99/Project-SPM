import React, { Component } from 'react';
import ProductManagerDashboard from '../../../../components/ProductManagerDashboard/ProductManagerDashboard';
import axios from 'axios'
import { Form, Table, Row, Col, Container } from "react-bootstrap";
import { Button, Dropdown } from 'react-bootstrap';
//import uuid v4
import { v4 as uuid } from 'uuid';

export default class OrderList extends Component {
    
    constructor(props){
        super(props);

        this.state={
            orders:[]
        };
    }

    componentDidMount(){
        this.retrieveOrders();
    }

    retrieveOrders(){
        axios.get("http://localhost:8000/order/get").then(res=>{
            if(res.data.success){
                this.setState({
                    orders:res.data.existingOrders
                });
                console.log(this.state.orders)
            }
        });
    }

       //Search bar
  filterData(orders, searchKey) {
    const result = orders.filter(
      (item) =>
        item.orderCode.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
        item.orderCode.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
        item.supplierId.toLowerCase().includes(searchKey) ||
        item.supplierId.toUpperCase().includes(searchKey)
    );

    this.setState({ orders: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/order/get").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingOrders, searchKey);
      }
    });
  };

  onDelete = (id) => {
    if (window.confirm("Do you want to remove this panel?")) {
      axios.delete(`http://localhost:8000/order/delete/${id}`).then((res) => {
        alert("Order removed Successfully!");
        this.retrieveOrders();
      });
    }
  };

  render() {
  
    return (
        <>
            <ProductManagerDashboard/>

            
            <div style={{ "marginLeft": "40px", "marginTop": "30px", "flex": "none" }}>

            <Row>
                <Col>
                    <Button style={{ "width": "250px", "fontWeight": "400" }}> <a href='/orderList' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
                PURCHASED MATERIALS
            </a></Button>

                </Col>

                <Col>
                    <Button style={{ "width": "200px", "fontWeight": "600" }}><a href='/createOrder' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
                PURCHASE ORDER 
            </a></Button>
                </Col>
{/* 
                <Col>
                    <Button style={{ "width": "200px", "fontWeight": "600" }}><a href='/createOrder' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
                SEND TO SUPPLIER
            </a></Button>
                </Col> */}
                <Col>
                    <Button style={{ "width": "250px", "fontWeight": "600" }}><a href='/orderReport' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
                GENERATE REPORT
            </a></Button>
                </Col>
                
            </Row>

            
            
            {/* <Sidebar /> */}
            <Row>
            <div className="container"
                    style={{
                    // margin: "40px",
                    // marginLeft: "0px",
                    width: "100%",
                    borderRadius: "0px",
                    marginTop: "0px",
                    // background: "#D3D3D3",
                    }}>
               
  
            <div className='card'
                style={{
                    //marginTop:'250px',
                    height:'auto'
                }}
            >
            <h2
              style={{
                color: 'rgba(6, 21, 117)',
                fontSize: "28px",
                fontWeight: "bold",
                // textAlign: "center",
                marginLeft:'20px',
                marginTop:'20px',
                height:'auto'
              }}
            >
               PURCHASED MATERIALS
               
            </h2> 
              <br></br>
              <br></br>
             <div>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
              style={{
                width: "350px",
                marginLeft: "10px",
                marginTop: "-20px",
                borderColor: "rgba(6, 21, 117,0.5)",
              }}
            ></input>
          </div>
           
          <div className='table-responsive'>
                <table className="table "
                style={{
                    marginLeft:'0px',
                    // backgroundColor: "#ffff",
                    borderRadius: "5px",
                    width: "100%",
                    
                    //border: "none",
                }}>
                    <thead style={{backgroundColor:'white',color:'black'}}>
                        <tr>
                             
                            <th scope="row">ORDER DATE</th>
                            <th scope="row">ORDER CODE</th>
                            <th scope="row">SUPPLIER ID</th>
                            <th scope="row">CONTACT PERSON</th>
                            <th scope="row">SUPPLIER EMAIL</th>
                            <th scope="row">ORDERED MATERIALS</th>
                            <th scope="row">ACTION</th> 
                        </tr>
                    </thead>
                    <tbody style={{backgroundColor:'rgba(1, 11, 67 )',color:'white'}}>
                        {this.state.orders.map((orders,index)=>(
                            <tr>
                                 
                               
                                <td>
                                
                                {orders.orderDate}
                           
                               </td>
                               <td>
                                
                                {orders.orderCode}
                           
                               </td>
                               <td>
                                
                                {orders.supplierId}
                           
                               </td>
                               <td>
                                
                                {orders.contactPerson}
                           
                               </td>
                               <td>
                                
                                {orders.supplierEmail}
                           
                               </td>
                                <td>
                                  {orders.materialItem.map((singleItem,index)=>(
                                    <ul key={index}>
                                     {singleItem.materialItem &&
                                     <>
                                      {singleItem.materialItem}
                                     </>
                                     }
                                    </ul>
                                  ))}

                                </td>
        
                                <td>

                                    <a className ="btn " href="#" onClick={() => this.onDelete(orders._id)} style={{ backgroundColor:'#fff', textDecoration: "none", color: "#000", fontWeight:'bold' }}
                                        >
                                        <i className='fas fa-trash-alt'></i>
                                         
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
               </div>    
           
        </div>
        <br/></div>
        </Row>
        </div>
        </>

    )
  }
}
