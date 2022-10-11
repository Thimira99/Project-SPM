// import React, { Component } from 'react';
// import ProductManagerDashboard from '../../../../components/ProductManagerDashboard/ProductManagerDashboard';
// import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
// import AccountCSS from './account.module.css';
// import { BsRecord2Fill } from "react-icons/bs";
// import { BsXLg ,BsTrashFill,BsFilterSquareFill} from "react-icons/bs";
// import { MDBDataTable } from 'mdbreact';
// import { FcCheckmark, FcCancel, FcOk, FcInspection, FcOvertime, FcProcess, FcPicture ,FcFullTrash,FcViewDetails } from "react-icons/fc";
// import { FaEdit } from "react-icons/fa";
// import axios from 'axios'

// class MaterialList extends Component {

//     constructor(props) {
//         super(props)

//         this.state = {
//             materials:[] 
         
//         }

        
//         this.getMaterialList = this.getMaterialList.bind(this);
//     }

//     onClickUpdate(id){
//         this.props.history.push(`/updateMaterial/${id}`);
//     }

//     onClickDelete(id){
//         if (window.confirm("Do you want to remove this material?")) {
//             axios.delete(`http://localhost:8000/material/delete/${id}`).then((res) => {
//               alert("Material removed Successfully!");
//               this.getMaterialList();
//             });
//           }
//     }

//     getMaterialList(){

//         axios.get("http://localhost:8000/material/get").then(res=>{  
            
//             if(res.status ==  "200"){   
//                 this.setState({  
//                     materials:res.data.existingMaterials  
//                 }, () =>{
//                     console.log("Materials", this.state.materials)

//                     const userAttributes = []
//                     this.state.materials.forEach(materials => {
                        
                            
//                         userAttributes.push({
//                             datecreated: materials.dateCreated,
//                             materialid: materials.materialId,
//                             supplier: materials.supplier,
//                             cost: materials.cost,
//                             weight: materials.weight,
                               
//                             status: materials.status == 'ACTIVE' ? <FcCheckmark style={{"fontSize":"25px"}}/>: <FcCancel style={{"fontSize":"25px"}}/>,
            
//                             action: <><FaEdit style={{"marginLeft":"15px","fontSize":"23px"}} onClick={()=> this.onClickUpdate(materials._id)}/>
                             
//                             <BsTrashFill style={{"marginLeft":"15px","fontSize":"23px"}} onClick={()=> this.onClickDelete(materials._id)} /></>
            
            
//                         })
//                     });
            
//                     this.setState({
//                         data: {
//                             columns: [
//                                 {
//                                     label: 'CREATED DATE',
//                                     field: 'datecreated',
//                                     sort: 'asc',
//                                     width: 130,
            
//                                 },
//                                 {
//                                     label: 'MATERIAL ID',
//                                     field: 'materialid',
//                                     sort: 'asc',
//                                     width: 100
//                                 },
//                                 {
//                                     label: 'SUPPLIER',
//                                     field: 'supplier',
//                                     sort: 'asc',
//                                     width: 130,
            
//                                 },
            
//                                 {
//                                     label: 'COST',
//                                     field: 'cost',
//                                     sort: 'asc',
//                                     width: 100
//                                 },

//                                 {
//                                     label: 'WEIGHT',
//                                     field: 'weight',
//                                     sort: 'asc',
//                                     width: 100
//                                 },
                              
//                                 {
//                                     label: 'STATUS',
//                                     field: 'status',
//                                     sort: 'asc',
//                                     width: 80,
//                                 }
//                                 ,
//                                 {
//                                     label: 'ACTION ',
//                                     field: 'action',
//                                     sort: 'asc',
//                                     width: 120
//                                 }
//                             ],
//                             rows: userAttributes
//                         }
//                     })
//                 });
                 
                
//             }
//         });

 

//     }

//     componentDidMount() {
//         this.getMaterialList();
//     }



//     render() {
//         return (
//             <>
//                 <ProductManagerDashboard />

//                 <div style={{ "marginLeft": "40px", "marginTop": "30px", "flex": "none" }}>

//                     <Row>
//                         <Col>
//                             <Button style={{ "width": "150px", "fontWeight": "600" }}> <a href='/materialList' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
//                         MATERIAL LIST
//           </a></Button>

//                         </Col>

//                         <Col>
//                             <Button style={{ "width": "150px", "fontWeight": "600" }}><a href='/addMaterial' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
//                         ADD MATERIAL
//           </a></Button>
//                         </Col>
                        
//                     </Row>

//                 </div>
                
//                 <Row>

//                     <div className={AccountCSS.container}>

//                         <MDBDataTable


//                             style={{ "whitespace": "nowrap", }}
//                             scrollY
//                             maxHeight="1000px"
//                             loading={false}
//                             hover
//                             bordered
//                             word-wrap="breakword"

//                             whitespace="nowrap"
//                             textoverflow="ellipsis"

//                             data={this.state.data}
//                             className={AccountCSS.yourcustomstyles}
//                         />

//                     </div>





//                 </Row>



//             </>
//         );
//     }
// }

// export default MaterialList;