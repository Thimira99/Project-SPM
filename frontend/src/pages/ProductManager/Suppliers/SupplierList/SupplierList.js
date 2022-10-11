import React, { Component } from 'react';
import ProductManagerDashboard from '../../../../components/ProductManagerDashboard/ProductManagerDashboard';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import AccountCSS from './account.module.css';
import { BsRecord2Fill } from "react-icons/bs";
import { BsXLg ,BsTrashFill,BsFilterSquareFill} from "react-icons/bs";
import { MDBDataTable } from 'mdbreact';
import { FcCheckmark, FcCancel, FcOk, FcInspection, FcOvertime, FcProcess, FcPicture ,FcFullTrash,FcViewDetails } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import axios from 'axios'

class SupplierList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            suppliers:[] 
         
        }

        
        this.getSupplierList = this.getSupplierList.bind(this);
    }

    onClickUpdate(id){
        this.props.history.push(`/updateSupplier/${id}`);
    }  

    onClickDelete(id){
        if (window.confirm("Do you want to remove this supplier?")) {
            axios.delete(`http://localhost:8000/supplier/delete/${id}`).then((res) => {
              alert("Supplier removed Successfully!");
              this.getSupplierList();
            });
          }
    }

    getSupplierList(){

        axios.get("http://localhost:8000/supplier/get").then(res=>{  
            // console.log(res.data.existingSuppliers)
            if(res.status ==  "200"){   
                this.setState({  
                    suppliers:res.data.existingSuppliers  
                }, () =>{
                    console.log("Suppliers", this.state.suppliers)

                    const userAttributes = []
                    this.state.suppliers.forEach(suppliers => {
                        
                            
                        userAttributes.push({
                            datecreated: suppliers.dateCreated,
                            supplierid: suppliers.supplierId,
                            supplier: suppliers.supplier,
                            contactperson: suppliers.contactPerson,
                               
                            status: suppliers.status == 'Active' ? <FcCheckmark style={{"fontSize":"25px"}}/>: <FcCancel style={{"fontSize":"25px"}}/>,
            
                            action: <><FaEdit style={{"marginLeft":"15px","fontSize":"23px"}} onClick={()=> this.onClickUpdate(suppliers._id)}/>
                             
                            <BsTrashFill style={{"marginLeft":"15px","fontSize":"23px"}} onClick={()=> this.onClickDelete(suppliers._id)}/></>
            
            
                        })
                    });
            
                    this.setState({
                        data: {
                            columns: [
                                {
                                    label: 'CREATED DATE',
                                    field: 'datecreated',
                                    sort: 'asc',
                                    width: 100,
            
                                },
                                {
                                    label: 'SUPPLIER ID',
                                    field: 'supplierid',
                                    sort: 'asc',
                                    width: 100
                                },
                                {
                                    label: 'SUPPLIER',
                                    field: 'supplier',
                                    sort: 'asc',
                                    width: 130,
            
                                },
            
                                {
                                    label: 'CONTACT PERSON',
                                    field: 'contactperson',
                                    sort: 'asc',
                                    width: 100
                                },
                              
                                {
                                    label: 'STATUS',
                                    field: 'status',
                                    sort: 'asc',
                                    width: 100,
                                }
                                ,
                                {
                                    label: 'ACTION ',
                                    field: 'action',
                                    sort: 'asc',
                                    width: 120
                                }
                            ],
                            rows: userAttributes
                        }
                    })
                });
                 
                
            }
        });

 

    }

    componentDidMount() {
        this.getSupplierList();
    }



    render() {
        return (
            <>
                <ProductManagerDashboard />

                <div style={{ "marginLeft": "40px", "marginTop": "30px", "flex": "none" }}>

                    <Row>
                        <Col>
                            <Button style={{ "width": "150px", "fontWeight": "600" }}> <a href='/supplierList' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
                        SUPPLIER LIST
          </a></Button>

                        </Col>

                        <Col>
                            <Button style={{ "width": "150px", "fontWeight": "600" }}><a href='/addSupplier' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
                        ADD SUPPLIER
          </a></Button>
                        </Col>
                    </Row>

                </div>
                
                <Row>

                    <div className={AccountCSS.container}>

                        <MDBDataTable


                            style={{ "whitespace": "nowrap", }}
                            scrollY
                            maxHeight="1000px"
                            loading={false}
                            hover
                            bordered
                            word-wrap="breakword"

                            whitespace="nowrap"
                            textoverflow="ellipsis"

                            data={this.state.data}
                            className={AccountCSS.yourcustomstyles}
                        />

                    </div>





                </Row>



            </>
        );
    }
}

export default SupplierList;