import axios from 'axios';
import React, { Component } from 'react';
import SalesRepDashboard from '../../../../components/SalesRepDashboard';
import HashLoader from "react-spinners/HashLoader";
import Swal from 'sweetalert2';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import { BsTrashFill ,BsFileEarmarkPdf } from "react-icons/bs";
import AccountCSS from './account.module.css';
import { saveAs } from 'file-saver';


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
            billItemObj: '',
            shopData: '',
            TotalAmount: '',

            name: '',
            receiptId: 0,
            price1: 0,
            price2: 0,
        }

        this.onPdfSave = this.onPdfSave.bind(this);
    }

    onPdfSave(){

        this.setState({
            loading: true
        })

        const posturl = 'http://localhost:8000/api/InvoiceProduct/post/reports';
        const geturl = 'http://localhost:8000/api/InvoiceProduct/get/reports';

        const data = {
         
            "InvoiceObject": this.state.InvoiceData,
            "ProductObject": this.state.billItemObj,
            "ShopObject": this.state.shopData
        }

        axios.post(posturl, data)
        .then(() => axios.get(geturl, { responseType: 'blob' }))
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
  
          if(pdfBlob){
            this.setState({
                loading: false
            })
          }
          saveAs(pdfBlob, this.state.shopName +" - " +"INVOICE" + this.state.invoiceId);
        })

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
                        billItemObj: res.data.data[0].productData
                    }, () => {

                        console.log("bill", this.state.billItemObj)
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
                                <span style={{ "fontSize": "larger", "fontWeight": "400" }}>{this.state.TotalAmount + ".00"}</span>
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

                {/* ............................... product table */}
                <div className={AccountCSS.tableContainertwo}>
                    <div style={{ "marginTop": "18px", "marginLeft": "25px", "color": "rgba(66, 74, 155, 1)", "fontFamily": "sans-serif" }}>

                        <h5>Product Details<hr style={{ "marginTop": "2px", "width": "1520px", "border": "1px solid rgba(66, 74, 155, 1)" }} /></h5>

                        {this.state.billItemObj && <Table variant="light" class="table  " >

                            <thead style={{ 'display': 'block', "marginRight": "30px" }} >
                                <tr>
                                    <th style={{ "width": "25px", "font-size": "20px", "fontWeight": "500" }}></th>

                                    <th style={{ "width": "740px", "font-size": "20px", "fontWeight": "400" }}>Product Name:</th>
                                    <th style={{ "width": "210px", "font-size": "20px", "fontWeight": "400" }}>Cost Price:</th>
                                    <th style={{ "width": "390px", "font-size": "20px", "fontWeight": "400" }}>Qty:</th>
                                    <th style={{ "width": "189px", "font-size": "20px", "fontWeight": "400" }}><span style={{ "float": "right", "marginRight": "40px" }}>Amount:</span></th>


                                </tr>
                            </thead>

                            <tbody style={{ 'height': "max-content", 'overflow': 'auto', 'display': 'block', "borderTop": "ridge", "marginRight": "30px" }}>
                                {
                                    this.state.billItemObj.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td style={{ 'width': '20px', "font-size": "16px", "fontWeight": "400" }}>{index + 1}</td>
                                                <td style={{ 'width': '740px', "font-size": "16px", "fontWeight": "400" }}>{item.itemname}</td>
                                                <td style={{ 'width': '210px', "font-size": "16px", "fontWeight": "400" }}>{"Rs." + item.price}</td>
                                                <td style={{ 'width': '390px', "font-size": "16px", "fontWeight": "400" }}>{item.qty}</td>
                                                <td style={{ 'width': '180px', "font-size": "16px", "fontWeight": "200" }}><span style={{ "float": "right", "marginRight": "40px" }}>{(Number(item.amount)).toLocaleString('en-US') + ".00"}</span></td>


                                            </tr>
                                        )
                                    })
                                }

                            </tbody>

                            <tfoot style={{ 'display': 'block', "borderTop": "ridge", "marginRight": "30px" }}>
                                {
                                    <tr>
                                        <th style={{ "width": "20px", "font-size": "small" }}></th>

                                        <th style={{ "width": "740px", "font-size": "small" }}></th>
                                        <th style={{ "width": "210px", "font-size": "small" }}></th>
                                        <th style={{ "width": "380px", "font-size": "small" }}>{this.state.curentqty1}</th>
                                        <th style={{ "width": "200px", "font-size": "16px", "fontWeight": "bolder" }}><span style={{ "float": "right", "marginRight": "40px", "borderBottomStyle": "double" }}>{"Rs." + this.state.TotalAmount + ".00"}</span></th>



                                    </tr>
                                }
                            </tfoot>

                        </Table>}



                    </div>


                    <div style={{ "marginLeft": "40px", "marginTop": "30px", "flex": "none" }}>


                        <Row>

                            <Col>

                                <Button style={{ "width": "110px", "fontWeight": "600" ,"marginBottom":"20px"}} onClick={this.onPdfSave}>Print<span style={{"fontSize":"22px","marginLeft":"8px"}}><BsFileEarmarkPdf/></span></Button>


                            </Col>

                        </Row>

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