
import React, { Component } from 'react';
import SalesRepDashboard from '../../../../components/SalesRepDashboard';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import AccountCSS from './account.module.css';
import { BsRecord2Fill } from "react-icons/bs";

class createShop extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }

        this.onAllShopSubmit = this.onAllShopSubmit.bind(this);
    }

    onAllShopSubmit(){

        this.props.history.push('/allShops');

    }

    componentDidMount(){

    }



    render() {
        return (
            <>
                <SalesRepDashboard />

                <div style={{ "marginLeft": "40px", "marginTop": "30px", "flex": "none" }}>


                    <Row>

                        <Col>

                            <Button style={{ "width": "110px", "fontWeight": "600" }} onClick={this.onAllShopSubmit}>ALL SHOPS</Button>


                        </Col>

                        <Col>

                            <Button style={{ "width": "110px", "fontWeight": "600" }}>CREATE</Button>

                        </Col>
                    </Row>


                </div>
                <Row>

                    <div className={AccountCSS.container}>

                        <div style={{ "marginTop": "18px", "marginLeft": "15px", "color": "rgba(66, 74, 155, 1)", "fontFamily": "sans-serif" }}>

                            <h4>Shop Registration<hr style={{ "marginTop": "2px", "width": "1520px", "border": "1px solid rgba(66, 74, 155, 1)" }} /></h4>



                        </div>

                        <h5 style={{ "marginTop": "25px" }}><BsRecord2Fill style={{ "fontSize": "40px", "marginLeft": "-30px" }} /> Owner Details</h5>


                        <Form onSubmit={this.add} ref={this.formData}>
                            <div className={AccountCSS.form}>
                                <Row>
                                    <Col>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Name</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.holderName} onChange={this.changHolderName} name="holderName" />

                                        </Form.Group>

                                    </Col>

                                    <Col style={{ "marginLeft": "50px" }}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Phone Number</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.phoneNumber} onChange={this.changPhonenumber} name="phoneNumber" />
                                            {!this.state.holdertype && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter only numbers. </p>}


                                        </Form.Group>




                                    </Col>



                                </Row>

                                <Row>
                                    <Col>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>NIC Number</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.holderName} onChange={this.changHolderName} name="holderName" />

                                        </Form.Group>

                                    </Col>

                                    <Col style={{ "marginLeft": "50px" }}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Email Address</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.phoneNumber} onChange={this.changPhonenumber} name="phoneNumber" />
                                            {!this.state.holdertype && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter valide email. </p>}


                                        </Form.Group>




                                    </Col>



                                </Row>
                            </div>

                            <h5 style={{ "marginTop": "15px" }}><BsRecord2Fill style={{ "fontSize": "40px", "marginLeft": "-30px" }} /> Shop Details</h5>

                            <div className={AccountCSS.form}>
                                <Row>
                                    <Col>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Name</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.holderName} onChange={this.changHolderName} name="holderName" />

                                        </Form.Group>

                                    </Col>

                                    <Col style={{ "marginLeft": "50px" }}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Phone Number</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.phoneNumber} onChange={this.changPhonenumber} name="phoneNumber" />
                                            {!this.state.holdertype && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter only numbers. </p>}


                                        </Form.Group>




                                    </Col>



                                </Row>

                                <Row>
                                    <Col>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>NIC Number</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.holderName} onChange={this.changHolderName} name="holderName" />

                                        </Form.Group>

                                    </Col>

                                    <Col style={{ "marginLeft": "50px" }}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Email Address</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.phoneNumber} onChange={this.changPhonenumber} name="phoneNumber" />
                                            {!this.state.holdertype && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter valide email. </p>}


                                        </Form.Group>




                                    </Col>



                                </Row>


                                <Row>
                                    <Col>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>NIC Number</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.holderName} onChange={this.changHolderName} name="holderName" />

                                        </Form.Group>

                                    </Col>

                                    <Col style={{ "marginLeft": "50px" }}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Email Address</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.phoneNumber} onChange={this.changPhonenumber} name="phoneNumber" />
                                            {!this.state.holdertype && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter valide email. </p>}


                                        </Form.Group>




                                    </Col>



                                </Row>

                                <Row>
                                    <Col xs={2}>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>NIC Number</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.holderName} onChange={this.changHolderName} name="holderName" />

                                        </Form.Group>

                                    </Col>

                                    <Col xs={3} style={{ "marginLeft": "100px" }}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Email Address</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.phoneNumber} onChange={this.changPhonenumber} name="phoneNumber" />
                                            {!this.state.holdertype && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter valide email. </p>}


                                        </Form.Group>




                                    </Col>

                                    <Col style={{ "marginLeft": "50px" }}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Email Address</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.phoneNumber} onChange={this.changPhonenumber} name="phoneNumber" />
                                            {!this.state.holdertype && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter valide email. </p>}


                                        </Form.Group>




                                    </Col>



                                </Row>

                            </div>

                            <h5 style={{ "marginTop": "15px" }}><BsRecord2Fill style={{ "fontSize": "40px", "marginLeft": "-30px" }} /> Product Details</h5>

                            <div className={AccountCSS.form}>

                                <Row>

                                    <Col xs={4}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Email Address</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.phoneNumber} onChange={this.changPhonenumber} name="phoneNumber" />
                                            {!this.state.holdertype && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter valide email. </p>}


                                        </Form.Group>




                                    </Col>


                                    <Col xs={1} style={{ "marginLeft": "100px" }}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>QTY</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.phoneNumber} onChange={this.changPhonenumber} name="phoneNumber" />



                                        </Form.Group>




                                    </Col>

                                    <Col>

                                        <div className={AccountCSS.productContainer}>


                                        </div>


                                    </Col>


                                </Row>

                            </div>

                        </Form>


                    </div>





                </Row>



            </>
        );
    }
}

export default createShop;