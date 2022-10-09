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

class ProductList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            products:[] 
         
        }

        
        this.getProductList = this.getProductList.bind(this);
    }

    onClickUpdate(id){
        this.props.history.push(`/updateProduct/${id}`);
    } 

    getProductList(){

        axios.get("http://localhost:8000/product/get").then(res=>{  
            // console.log(res.data.existingSuppliers)
            if(res.status ==  "200"){   
                this.setState({  
                    products:res.data.existingProducts  
                }, () =>{
                    console.log("Products", this.state.products)

                    const userAttributes = []
                    this.state.products.forEach(products => {
                        
                            
                        userAttributes.push({
                            datecreated: products.dateCreated,
                            productid: products.productId,
                            productname: products.productName,
                            producttype: products.productType,
                            quantity: products.quantity,
                            weight: products.weight,
                            price: products.price,
                        
            
                            action: <><FaEdit style={{"marginLeft":"15px","fontSize":"23px"}} onClick={()=> this.onClickUpdate(products._id)}/>
                            <BsFilterSquareFill style={{"marginLeft":"15px","fontSize":"23px"}} /><BsTrashFill style={{"marginLeft":"15px","fontSize":"23px"}}/></>
            
            
                        })
                    });
            
                    this.setState({
                        data: {
                            columns: [
                                {
                                    label: 'CREATED AT',
                                    field: 'datecreated',
                                    sort: 'asc',
                                    width: 150,
            
                                },
                                {
                                    label: 'PRODUCT ID',
                                    field: 'productid',
                                    sort: 'asc',
                                    width: 130
                                },
                                {
                                    label: 'PROUDCT',
                                    field: 'productname',
                                    sort: 'asc',
                                    width: 130,
            
                                },

                                {
                                    label: 'TYPE',
                                    field: 'producttype',
                                    sort: 'asc',
                                    width: 130,
            
                                },
            
                                {
                                    label: 'QUANTITY',
                                    field: 'quantity',
                                    sort: 'asc',
                                    width: 100
                                },
                              
                                {
                                    label: 'WEIGHT',
                                    field: 'weight',
                                    sort: 'asc',
                                    width: 100,
                                }
                                ,
                                {
                                    label: 'PRICE',
                                    field: 'price',
                                    sort: 'asc',
                                    width: 100
                                }
                                ,
                                {
                                    label: 'STATUS',
                                    field: 'action',
                                    sort: 'asc',
                                    width: 140
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
        this.getProductList();
    }



    render() {
        return (
            <>
                <ProductManagerDashboard />

                <div style={{ "marginLeft": "40px", "marginTop": "30px", "flex": "none" }}>

                    <Row>
                        <Col>
                            <Button style={{ "width": "150px", "fontWeight": "600" }}> <a href='/productList' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
                        PRODUCT LIST
          </a></Button>

                        </Col>

                        <Col>
                            <Button style={{ "width": "150px", "fontWeight": "600" }}><a href='/addProduct' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
                        ADD PRODUCT
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

export default ProductList;