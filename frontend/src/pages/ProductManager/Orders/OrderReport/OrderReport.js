import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from "jspdf";
import AccountCSS from './account.module.css';
import ProductManagerDashboard from '../../../../components/ProductManagerDashboard/ProductManagerDashboard';
import logo from '../../../../images/logo.png';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
 

export default class OrderReport extends Component{
    constructor(props){
        super(props);

        this.state={
            orders:[],
             date: new Date(),
             hours:new Date().getHours(), //To get the Current Hours
             min:new Date().getMinutes(), //To get the Current Minutes
             sec:new Date().getSeconds() //To get the Current Seconds

        };
    }

    

    generatePDF=()=>{
        const doc = new jsPDF('p','pt',[1120, 1310]);//(p,pt= points (mm,cm),page size)
        doc.html(document.querySelector("#orderRepo"),{
            callback:function(pdf){
                const pageCount = doc.internal.getNumberOfPages(0);
                pdf.save("Summary Purchased Details");
            }
        });
    };
    componentDidMount(){
        this.retrieveOrders();
    }
    retrieveOrders(){
        axios.get("http://localhost:8000/order/get").then(res=>{
            if(res.status==200){
                this.setState({
                    orders:res.data.existingOrders
                });

                console.log(this.state.orders)
            }
        });
    }
    
    render() {
        return (
            <>
            <ProductManagerDashboard />
            <div className='card' style={{marginTop:'0px',width:'100%',alignItems:'center',marginLeft:'0px',border:'none',height:'auto'}} >
            

                <div className="row">
                
                <br/>
                <br/>
                <div className="col-lg-9 mt-2 mb-2"><br/><br/>
            
                    &nbsp;&nbsp;&nbsp;
 
                    <Button style={{ "width": "200px", "fontWeight": "600" }}><a href='/addMaterial' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
                        GENERATE REPORT
          </a></Button>

                   
                </div>

                

                    {/* Stock report  */}
                    <br/>
                <div id="orderRepo">
                    <img src={logo} alt='' style={{width:'200px', marginLeft:'3.5px',marginTop:'10px'}}/>

                <h2 style={{marginLeft:'300px',color:'black',marginTop:'-90px', fontSize:'40px'}}>Summary Order Report</h2>
                {/* <h4 style={{color:'black',fontWeight:'bolder',marginTop:'50px',marginLeft:'400px'}}> 
                Total number of Stocks: 
                    {this.state.stocks.reduce(
                           (sum,stock)=>sum+stock.stock_count,0
                    )}
                </h4> */}
            
               <table style={{marginTop:'80px',backgroundColor:'#ffff',borderRadius:'30px',borderColor:'#ffff',marginLeft:'200px',width:'auto'}}>
                   <thead>
                    <tr  style={{fontWeight:'bold',color:'black',fontSize:'20px', width:'auto'}}>
                        <th scope="col" style={{width:'130px'}}>Order Date</th>
                        <th scope="col" style={{width:'130px'}}>Order Code</th>
                        <th scope="col" style={{width:'130px'}}>Supplier Id</th>
                        <th scope="col" style={{width:'130px'}}>Contact Person</th>
                        <th scope="col" style={{width:'130px'}}>Supplier Email</th>
                        <th scope="col" style={{width:'130px'}}>Ordered Materials</th>
                    </tr>
                    </thead>
                <tbody>
                    {this.state.orders.map((orders,index)=>(
                    <tr key={index}>
                        <td>
                            
                                {orders.orderDate}
                           
                        </td>
                        <td>{orders.orderCode}</td>
                        <td>{orders.supplierId}</td>
                        <td>{orders.contactPerson}</td>
                        <td>{orders.supplierEmail}</td>
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
                       
                    </tr>
                    ))}
                </tbody>
               </table>
               <br/>
                  
                    <h6 id="gqcenter" style={{marginLeft:'50px', marginTop:'60px'}}>
                    SNACKHACK &nbsp;&nbsp;365 <br/>
                    Order summary report <br/>
                    on {this.state.date.toLocaleDateString()}<br/>
                    At {this.state.hours}:{this.state.min}:{this.state.sec}
                    </h6>
                    <br/>
                    <div style={{marginLeft:'900px',marginTop:'-120px'}}>
                    <br/>
                    <p>.................................</p>
                    <h6>Signature</h6></div>
                    <div className="date" style={{marginLeft:'900px'}}>
                        <p> Date {this.state.date.toLocaleDateString()}</p>
                    </div>


                    
            </div>
            
            </div>
            </div>
            </> 
            
        )
    }
}