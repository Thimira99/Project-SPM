// import React, { Component } from 'react';
// import ProductManagerDashboard from '../../../../components/ProductManagerDashboard/ProductManagerDashboard';
// import axios from 'axios'
// import { Form, Table, Row, Col, Container } from "react-bootstrap";
// import { Button, Dropdown } from 'react-bootstrap';
// import { PieChart, Pie, Tooltip} from "recharts";
// //import uuid v4
// import { v4 as uuid } from 'uuid';

// export default class RawDashBoard extends Component {
    
//     constructor(props){
//         super(props);

//         this.state={
//             products:[]
//         };
//     }

//     componentDidMount(){
//         this.retrieveProducts();
//     }

//     retrieveProducts(){
//         axios.get("http://localhost:8000/product/get").then(res=>{
//             if(res.data.success){
//                 this.setState({
//                     products:res.data.existingProducts
//                 });
                 
//             }
//         });
//     }

  
 

//   render() {

//     var totalUnitPrice = 0;
//     this.state.products.map(
//      product =>
//      totalUnitPrice += product.price, 
//      product => 
//      product.price++ ) 

    
//      var totalProductPrice = 0;
//      this.state.products.map(
//         product =>
//         totalProductPrice =  ((product.quantity)* (product.price)) ,
//         product => 
//         ((product.quantity)* (product.price)))
      
//     return (
//         <>
//             <ProductManagerDashboard/>

            
            
//             <div style={{ "marginLeft": "40px", "marginTop": "30px", "flex": "none" }}>

//             <Row>
//                 <Col>
//                     <Button style={{ "width": "250px", "fontWeight": "400" }}> <a href='/orderList' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
//                 PURCHASED MATERIALS
//             </a></Button>

//                 </Col>

//                 <Col>
//                     <Button style={{ "width": "200px", "fontWeight": "600" }}><a href='/createOrder' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
//                 PURCHASE ORDER 
//             </a></Button>
//                 </Col>

//                 <Col>
//                     <Button style={{ "width": "200px", "fontWeight": "600" }}><a href='/productChart' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
//                 PRODUCT CHART
//             </a></Button>
//                 </Col>
//                 <Col>
//                     <Button style={{ "width": "250px", "fontWeight": "600" }}><a href='/orderReport' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
//                 GENERATE REPORT
//             </a></Button>
//                 </Col>
                
//             </Row>

            
            
//             {/* <Sidebar /> */}
//             <Row>
//             <div className="container"
//                     style={{
//                     // margin: "40px",
//                     // marginLeft: "0px",
//                     width: "100%",
//                     borderRadius: "0px",
//                     marginTop: "0px",
//                     // background: "#D3D3D3",
//                     }}>
               
  
//             <div className='card'
//                 style={{
//                     //marginTop:'250px',
//                     height:'auto'
//                 }}
//             >
//             <h2
//               style={{
//                 color: 'rgba(6, 21, 117)',
//                 fontSize: "28px",
//                 fontWeight: "bold",
//                 // textAlign: "center",
//                 marginLeft:'20px',
//                 marginTop:'20px',
//                 height:'auto'
//               }}
//             >
//                PRODUCT CHART
               
//             </h2> 
//               <br></br>
//               <br></br>
 
          
           
//           {/* <div className='table-responsive'>
//                 <table className="table "
//                 style={{
//                     marginLeft:'0px',
//                     borderRadius: "5px",
//                     width: "100%",
                    
                    
//                 }}>
//                     <thead style={{backgroundColor:'white',color:'black'}}>
//                         <tr>
                             
//                             <th scope="row">ORDER DATE</th>
//                             <th scope="row">ORDER CODE</th>
//                             <th scope="row">SUPPLIER ID</th>
//                             <th scope="row">CONTACT PERSON</th>
//                             <th scope="row">SUPPLIER EMAIL</th>
//                             <th scope="row">ORDERED MATERIALS</th>
//                             <th scope="row">ACTION</th> 
//                         </tr>
//                     </thead>
//                     <tbody style={{backgroundColor:'rgba(1, 11, 67 )',color:'white'}}>
                        
//                     </tbody>

//                 </table>
//                </div>   */}
//             {/* new */}
//             <div style={{"display":"flex" , "marginLeft": "50px"} } > 
//                 <PieChart width={400} height={400} radius={50} >
 
//                  <Pie
//                      dataKey="value"
//                      isAnimationActive={true}
//                      data={[
                        
//                         // key = {product.producId})
//                      { name: "Unit Price", value: totalUnitPrice},
//                     //  { name: "Expense", value: EtotalPrice},
//     ]}
      
//                      fill="#000080"
      
//                     label
//                      />

//                     {/* Display the tooltips */}
//                     <Tooltip />
//                     </PieChart>
                    
//                     </div>
             

//             <div className="col-md-4">
//                         <div className="card card-body mt-3" style={{"width":"500px","backgroundColor":"#c0c0c0", "marginLeft": "50px"}}>
//                             <h4>Sub Unit Price : 
//                                 <span className="float-end">{totalUnitPrice}</span>
//                             </h4>
                            
//                             <h4>Grand Unit Price : 
//                                 <span className="float-end">{totalUnitPrice}</span>
                                 
//                             </h4>

                           
    
//                             <h4>Total Product Price : 
//                                 <span className="float-end"> {totalProductPrice}</span>
                                 
//                             </h4>
//                             <hr />
//                             {/* <Link to="/Chart" className="btn btn-primary"> Summary</Link> */}
//                         </div>
//                         </div>  
  
           
//         </div>
//         <br/></div>
//         </Row>
//         </div>
//         </>

//     )
//   }
// }
