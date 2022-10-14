import axios from 'axios';
import React, { Component } from 'react';
import SalesRepDashboard from '../../../../components/SalesRepDashboard';
import HashLoader from "react-spinners/HashLoader";
import Swal from 'sweetalert2';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";

import AccountCSS from './account.module.css';

class ViewInvoice extends Component {

    constructor(props) {

        super(props)

        this.state = {

            invoiceId: this.props.match.params.id,
            shopName: this.props.match.params.name,
            shopID: this.props.match.params.shopId,
            Agent: '',
            loading: false,
            InvoiceData: '',
            InvoieProductData: '',
            shopData: '',
            TotalAmount: ''
        }
    }

    getInvoiceData() {

        const url = 'http://localhost:8000/api/Invoice/get/shopByNameAndAgentAndInvoice'

        const data = {

            "AgentNumber": this.state.Agent.firstName,
            "ShopName": this.state.shopName,
            "InvoiceNumber": this.state.invoiceId
        }

        axios.post(url, data).then((res) => {
            console.log(res)
            if (res.data.code === '200') {

                if (res.data.data.length != 0) {

                    this.setState({
                        InvoiceData: res.data.data[0]

                    }, () => {
                        console.log("lll", (this.state.InvoiceData.TotalAmount).toLocaleString('en-US'))
                        const num = Number(this.state.InvoiceData.TotalAmount);



                        this.setState({
                            TotalAmount: num.toLocaleString('en-US'),
                            loading: false
                        })
                    })
                } else {

                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'Product Cannot Find',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    this.setState({
                        loading: false
                    })
                }



            } else {

                this.setState({
                    loading: false
                }, () => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'Network Error',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            }

        })

    }

    getInvoiceWithProducts() {

        const url = 'http://localhost:8000/api/Invoice/get/shopByNameAndAgentAndInvoice/products';

        const data = {

            "AgentNumber": this.state.Agent.firstName,
            "ShopName": this.state.shopName,
            "InvoiceNumber": this.state.invoiceId
        }

        axios.post(url, data).then((res) => {
            console.log(res)
            if (res.data.code === '200') {

                if (res.data.data.length != 0) {

                    this.setState({
                        InvoieProductData: res.data.data
                    }, () => {

                        this.setState({
                            loading: false
                        })

                    })

                } else {

                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Product Cannot Find',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    this.setState({
                        loading: false
                    })

                }

            } else {
                this.setState({
                    loading: false
                }, () => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Network Error',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })


            }
        })

    }


    getAgent() {

        this.setState({
            loading: true
        })

        const Agent = JSON.parse(localStorage.getItem('user'));
        this.setState({
            Agent: Agent
        }, () => {
            this.getInvoiceData();
            this.getInvoiceWithProducts();
        })

    }


    getShopData() {

        this.setState({
            loading: true
        })

        console.log("shopid", this.state.shopID)

        const url = `http://localhost:8000/api/account/get/${this.state.shopID}`;

        axios.get(url).then((res) => {
            console.log("res", res)
            if (res.data.code === "200") {

                this.setState({
                    shopData: res.data.supplier,
                    loading: false
                })

            } else {

                this.setState({
                    loading: false
                }, () => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Cant load Shop data',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })

            }
        })

    }



    componentDidMount() {


        this.getAgent();
        this.getShopData();

    }


    render() {
        return (
            <>
                <SalesRepDashboard />

                <Row>

                    <div className={AccountCSS.container}>
                        <div style={{ "marginTop": "18px", "marginLeft": "15px", "color": "rgba(66, 74, 155, 1)", "fontFamily": "sans-serif" }}>

                            <h5>Shop Details<hr style={{ "marginTop": "2px", "width": "1520px", "border": "1px solid rgba(66, 74, 155, 1)" }} /></h5>



                        </div>


                        <div style={{ "margin": "20px" }}>

                            <Row style={{ "marginTop": "30px" }}>

                                <Col >
                                <div style={{ "marginLeft": "60px" }}>
                                        <span style={{ "fontSize": "larger", "fontWeight": "500" }}>Shop Name : </span>
                                    </div>
                                </Col>


                                <Col>
                                    <span style={{ "fontSize": "larger", "fontWeight": "400" }}>{this.state.shopData.sh_Name}</span>
                                </Col>


                                <Col >
                                    <span style={{ "fontSize": "larger", "fontWeight": "500" }}>Owner Name : </span>
                                </Col>


                                <Col>
                                    <span style={{ "fontSize": "larger", "fontWeight": "400" }}>{this.state.shopData.name}</span>
                                </Col>
                            </Row>


                            {/* 
....................... */}



                            <Row style={{ "marginTop": "20px" }}>

                                <Col >
                                <div style={{ "marginLeft": "60px" }}>
                                        <span style={{ "fontSize": "larger", "fontWeight": "500" }}>Registration Number : </span>
                                    </div>
                                </Col>


                                <Col>

                                    <span style={{ "fontSize": "larger", "fontWeight": "400" }}>{this.state.shopData.sh_RegistrationNumber}</span>
                                </Col>


                                <Col >
                                    <span style={{ "fontSize": "larger", "fontWeight": "500" }}>Owner PhoneNumber : </span>
                                </Col>


                                <Col>
                                    <span style={{ "fontSize": "larger", "fontWeight": "400" }}>{this.state.shopData.phonenNmber}</span>
                                </Col>
                            </Row>

                            {/* ............................... */}



                            <Row style={{ "marginTop": "20px" }}>

                                <Col >
                                <div style={{ "marginLeft": "60px" }}>
                                        <span style={{ "fontSize": "larger", "fontWeight": "500" }}>Shop PhoneNumber : </span>
                                    </div>
                                </Col>


                                <Col>
                                    <span style={{ "fontSize": "larger", "fontWeight": "400" }}>{this.state.shopData.sh_phoneNumber}</span>
                                </Col>


                                <Col >
                                    <span style={{ "fontSize": "larger", "fontWeight": "500" }}>Shop Address : </span>
                                </Col>


                                <Col>
                                    <span style={{ "fontSize": "larger", "fontWeight": "400" }}>{this.state.shopData.sh_Address}</span>
                                </Col>
                            </Row>



                        </div>
                    </div>
                </Row>


                <div className={AccountCSS.tableContainer}>
                    <div style={{ "marginTop": "18px", "marginLeft": "25px", "color": "rgba(66, 74, 155, 1)", "fontFamily": "sans-serif" }}>

                        <h5>Invoice Details<hr style={{ "marginTop": "2px", "width": "1520px", "border": "1px solid rgba(66, 74, 155, 1)" }} /></h5>



                    </div>

                    <div style={{ "margin": "20px" }}>

                        <Row style={{ "marginTop": "30px" }}>

                            <Col>
                                <div style={{ "marginLeft": "60px" }}>
                                    <span style={{ "fontSize": "larger", "fontWeight": "500" }}>Invoice Number : </span>
                                </div>
                            </Col>


                            <Col>

                                <span style={{ "fontSize": "larger", "fontWeight": "400" }}>{"INV" + this.state.InvoiceData.InvoiceNumber}</span>
                            </Col>


                            <Col >
                                
                                <span style={{ "fontSize": "larger", "fontWeight": "500" }}>Total Amount : </span>
                            </Col>


                            <Col>
                                <span style={{ "fontSize": "larger", "fontWeight": "400" }}>{ this.state.TotalAmount+".00"}</span>
                            </Col>
                        </Row>


                        {/* 
....................... */}



                        <Row style={{ "marginTop": "20px" }}>

                            <Col >
                            <div style={{ "marginLeft": "60px" }}>
                                    <span style={{ "fontSize": "larger", "fontWeight": "500" }}>Agent Name : </span>
                                </div>
                            </Col>


                            <Col>

                                <span style={{ "fontSize": "larger", "fontWeight": "400" }}>{this.state.InvoiceData.AgentNumber}</span>
                            </Col>


                            <Col >
                                <span style={{ "fontSize": "larger", "fontWeight": "500" }}>Invoice Date : </span>
                            </Col>


                            <Col>
                                <span style={{ "fontSize": "larger", "fontWeight": "400" }}>{this.state.InvoiceData.Date}</span>
                            </Col>
                        </Row>

                        {/* ............................... */}

                    </div>
                </div>


                {this.state.loading &&

                    <>
                        <div style={{ "display": "contents" }}>


                            <HashLoader
                                sizeUnit={"px"}
                                size={130}
                                color={"#123abc"}
                                loading={this.state.loading}
                            />

                        </div></>
                }

            </>
        );
    }
}

export default ViewInvoice;