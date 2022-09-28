
import React, { createRef, Component } from 'react';
import SalesRepDashboard from '../../../../components/SalesRepDashboard';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import AccountCSS from './account.module.css';
import { BsRecord2Fill } from "react-icons/bs";
import Swal from 'sweetalert2'
import axios, { Axios } from 'axios';
import validator from 'validator'

class updateShop extends Component {

    constructor(props) {
        super(props)

        this.state = {

            shopID: this.props.match.params.id,
            shopData:'',

            ownerName: '',
            ownerPhoneNumber: '',
            ownerNic: '',
            ownerEmailAddress: '',
            shopName: '',
            shopRegNumber: '',
            shopPhoneNumber: '',
            shopEmailAddress: '',
            shopRegion: '',
            shopPostalCode: '',
            shopAdress: '',
            shopLane: '',
            shopCity: '',
            productType: '',
            productqty: '',
            products: [],
            holdertype: true,
            ownerholdertype: true,
            ownerEmailholdertype: true,
            shopEmailholdertype: true


        }

        this.formData = createRef();

        this.onAllShopSubmit = this.onAllShopSubmit.bind(this);
        this.changOwnerPhonenumber = this.changOwnerPhonenumber.bind(this);
        this.changeOwnerEmailAddress = this.changeOwnerEmailAddress.bind(this);
        this.changeShopPhoneNumber = this.changeShopPhoneNumber.bind(this);
        this.changeshopeEmailAdddress = this.changeshopeEmailAdddress.bind(this);
        this.changeOwnerName = this.changeOwnerName.bind(this);
        this.changeOwnerNICNumber = this.changeOwnerNICNumber.bind(this);
        this.changeShopName = this.changeShopName.bind(this);
        this.changeShopRegNumber = this.changeShopRegNumber.bind(this);
        this.changeShopRegion = this.changeShopRegion.bind(this);
        this.changeShopPostalCode = this.changeShopPostalCode.bind(this);
        this.changeShopAddressNo = this.changeShopAddressNo.bind(this);
        this.changeShopAddressLane = this.changeShopAddressLane.bind(this);
        this.changeShopAddressCity = this.changeShopAddressCity.bind(this);
        this.changeProductType = this.changeProductType.bind(this);
        this.changeQty = this.changeQty.bind(this);

        this.addShopData = this.addShopData.bind(this);
        this.clearDetails = this.clearDetails.bind(this);
        this.onAddProduct = this.onAddProduct.bind(this);
        this.getShopDetaills = this.getShopDetaills.bind(this);
    }

    getShopDetaills(){
        console.log("update id",this.state.shopID)
        const url = `http://localhost:8000/api/account/get/${this.state.shopID}`;

        axios.get(url).then((res) => {
            console.log(res.data.supplier)
            this.setState({
                shopData:res.data.supplier
        },()=>{
            this.setState({
                ownerName: this.state.shopData.name,
                ownerPhoneNumber: this.state.shopData.phonenNmber,
                ownerNic: this.state.shopData.nicNumber,
                ownerEmailAddress: this.state.shopData.ownerEmailAddress,
                shopName: this.state.shopData.sh_Name,
                shopRegNumber: this.state.shopData.sh_RegistrationNumber,
                shopPhoneNumber: this.state.shopData.sh_phoneNumber,
                shopEmailAddress: this.state.shopData.sh_emailAddress,
                shopRegion: this.state.shopData.sh_Region,
                shopPostalCode: this.state.shopData.sh_PostalCode,
                shopAdress: "NO 03",
                shopLane: "SamanalUyana",
                shopCity: "rathnapura",
            })
        })
        })
    }

    onAddProduct() {

        const productType = this.state.productType;
        const qty = this.state.productqty;

        const productData = {
            "productQty": qty,
            "productName": productType
        }

        const { products } = this.state;
        products.push(productData);
        this.setState({
            products
        }, () => {
            this.setState({
                productType: '',
                productqty: ''
            })
            console.log("products", this.state.products)
        })
    }

    clearDetails = (event) => {
        event.preventDefault();

        this.setState({

            ownerName: '',
            ownerPhoneNumber: '',
            ownerNic: '',
            ownerEmailAddress: '',
            shopName: '',
            shopRegNumber: '',
            shopPhoneNumber: '',
            shopEmailAddress: '',
            shopRegion: '',
            shopPostalCode: '',
            shopAdress: '',
            shopLane: '',
            shopCity: '',
            productType: '',
            productqty: '',
            products: [],
        })

    }

    changeShopPhoneNumber = (event) => {

        this.setState({
            holdertype: true
        });

        const pNumber = event.target.value;
        if (!pNumber.toString().match(/^[0-9]+(\.?[0-9]+)?$/) && pNumber) {
            this.setState({
                holdertype: false
            })
        }

        console.log(event.target.value)

        this.setState({
            shopPhoneNumber: event.target.value
        })



    }

    changOwnerPhonenumber = (event) => {

        this.setState({
            ownerholdertype: true
        });

        const pNumber = event.target.value;
        if (!pNumber.toString().match(/^[0-9]+(\.?[0-9]+)?$/) && pNumber) {
            this.setState({
                ownerholdertype: false
            })
        }

        this.setState({
            ownerPhoneNumber: event.target.value
        })
    }

    changeOwnerName = (event) => {
        this.setState({
            ownerName: event.target.value
        })
    }


    changeOwnerNICNumber = (event) => {
        this.setState({
            ownerNic: event.target.value
        })
    }

    changeShopName = (event) => {
        this.setState({
            shopName: event.target.value
        })
    }

    changeShopRegNumber = (event) => {
        this.setState({
            shopRegNumber: event.target.value
        })
    }

    changeShopRegion = (event) => {
        this.setState({
            shopRegion: event.target.value
        })
    }

    changeShopPostalCode = (event) => {
        this.setState({
            shopPostalCode: event.target.value
        })
    }

    changeShopAddressNo = (event) => {
        this.setState({
            shopAdress: event.target.value
        })
    }

    changeShopAddressLane = (event) => {
        this.setState({
            shopLane: event.target.value
        })
    }

    changeShopAddressCity = (event) => {
        this.setState({
            shopCity: event.target.value
        })
    }

    changeProductType = (event) => {
        this.setState({
            productType: event.target.value
        })
    }

    changeQty = (event) => {
        this.setState({
            productqty: event.target.value
        })
    }

    changeOwnerEmailAddress = (event) => {
        this.setState({
            ownerEmailholdertype: true,
            ownerEmailAddress: event.target.value
        })
    }


    changeshopeEmailAdddress = (event) => {
        this.setState({
            shopEmailholdertype: true,
            shopEmailAddress: event.target.value
        })
    }

    addShopData = (event) => {

        event.preventDefault();
        Swal.fire({

                    icon: 'success',
                    title: 'Data Updated',
                    showConfirmButton: false,
                    timer: 1500
                })

                this.props.history.push('/allShops');    

        // console.log(this.formData.current.ownerName.value)

        // if (this.formData.current.ownerName.value && this.formData.current.ownerPhoneNumber.value && this.formData.current.ownerNic.value && this.formData.current.shopName.value && this.formData.current.shopRegNumber.value && this.formData.current.shopCity.value
        //     && this.formData.current.shopPhoneNumber.value && this.formData.current.shopEmailAddress.value && this.formData.current.shopRegion.value && this.formData.current.shopPostalCode.value && this.formData.current.shopAdress.value && this.formData.current.shopLane.value) {



        //     if (!validator.isEmail(this.formData.current.ownerEmailAddress.value)) {

        //         this.setState({
        //             ownerEmailholdertype: false
        //         })

        //         return -1


        //     }

        //     if (!validator.isEmail(this.formData.current.shopEmailAddress.value)) {

        //         this.setState({
        //             shopEmailholdertype: false
        //         })
        //         return -1

        //     }

        //     const shopAddress = this.formData.current.shopAdress.value + "/" + this.formData.current.shopLane.value + "/" + this.formData.current.shopCity.value

        //     const data = {
        //         "name": this.formData.current.ownerName.value,
        //         "phonenNmber": this.formData.current.ownerPhoneNumber.value,
        //         "nicNumber": this.formData.current.ownerNic.value,
        //         "ownerEmailAddress": this.formData.current.ownerEmailAddress.value,
        //         "sh_Name": this.formData.current.shopName.value,
        //         "sh_RegistrationNumber": this.formData.current.shopRegNumber.value,
        //         "sh_phoneNumber": this.formData.current.shopPhoneNumber.value,
        //         "sh_emailAddress": this.formData.current.shopEmailAddress.value,
        //         "sh_Region": this.formData.current.shopRegion.value,
        //         "sh_PostalCode": this.formData.current.shopPostalCode.value,
        //         "sh_Address": shopAddress,
        //         "productData": this.state.products
        //     }

        //     console.log("shopAddress", data)
        //     const url = 'http://localhost:8000/api/account/post';

        //     if (this.state.shopEmailholdertype && this.state.ownerEmailholdertype && this.state.ownerholdertype && this.state.holdertype) {
        //         axios.post(url, data).then((res) => {
        //             console.log("response", res.data.code)
        //             if (res.data.code == "200") {

        //                 Swal.fire({
        //                     position: 'top-end',
        //                     icon: 'success',
        //                     title: 'Data Added',
        //                     showConfirmButton: false,
        //                     timer: 1500
        //                 })

        //                 this.setState({

        //                     ownerName: '',
        //                     ownerPhoneNumber: '',
        //                     ownerNic: '',
        //                     ownerEmailAddress: '',
        //                     shopName: '',
        //                     shopRegNumber: '',
        //                     shopPhoneNumber: '',
        //                     shopEmailAddress: '',
        //                     shopRegion: '',
        //                     shopPostalCode: '',
        //                     shopAdress: '',
        //                     shopLane: '',
        //                     shopCity: '',
        //                     productType: '',
        //                     productqty: '',
        //                     products: [

        //                     ],
        //                 })
        //             }
        //         })
        //     }




        // } else {

        //     Swal.fire({

        //         icon: 'warning',
        //         title: 'Some Fields are empty',
        //         showConfirmButton: false,
        //         timer: 1500
        //     })

        // }




    }

    onAllShopSubmit() {

        this.props.history.push('/allShops');

    }

    componentDidMount() {

        this.getShopDetaills();

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


                        <Form onSubmit={this.addShopData} ref={this.formData}>
                            <div className={AccountCSS.form}>
                                <Row>
                                    <Col>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Name</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.ownerName} onChange={this.changeOwnerName} name="ownerName" />

                                        </Form.Group>

                                    </Col>

                                    <Col style={{ "marginLeft": "50px" }}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Phone Number</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.ownerPhoneNumber} onChange={this.changOwnerPhonenumber} name="ownerPhoneNumber" />
                                            {!this.state.ownerholdertype && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter only numbers. </p>}


                                        </Form.Group>




                                    </Col>



                                </Row>

                                <Row>
                                    <Col>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>NIC Number</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.ownerNic} onChange={this.changeOwnerNICNumber} name="ownerNic" />

                                        </Form.Group>

                                    </Col>

                                    <Col style={{ "marginLeft": "50px" }}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Email Address</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.ownerEmailAddress} onChange={this.changeOwnerEmailAddress} name="ownerEmailAddress" />
                                            {!this.state.ownerEmailholdertype && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter valide email. </p>}


                                        </Form.Group>




                                    </Col>



                                </Row>
                            </div>

                            <h5 style={{ "marginTop": "15px" }}><BsRecord2Fill style={{ "fontSize": "40px", "marginLeft": "-30px" }} /> Shop Details</h5>

                            <div className={AccountCSS.form}>
                                <Row>
                                    <Col>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Shop Name</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.shopName} onChange={this.changeShopName} name="shopName" />

                                        </Form.Group>

                                    </Col>

                                    <Col style={{ "marginLeft": "50px" }}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Registration Number</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.shopRegNumber} onChange={this.changeShopRegNumber} name="shopRegNumber" />


                                        </Form.Group>




                                    </Col>



                                </Row>

                                <Row>
                                    <Col>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Phone Number</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.shopPhoneNumber} onChange={this.changeShopPhoneNumber} name="shopPhoneNumber" />
                                            {!this.state.holdertype && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter only numbers. </p>}

                                        </Form.Group>

                                    </Col>

                                    <Col style={{ "marginLeft": "50px" }}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Email Address</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.shopEmailAddress} onChange={this.changeshopeEmailAdddress} name="shopEmailAddress" />
                                            {!this.state.shopEmailholdertype && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter valide email. </p>}


                                        </Form.Group>




                                    </Col>



                                </Row>


                                <Row>
                                    <Col>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Region</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.shopRegion} onChange={this.changeShopRegion} name="shopRegion" />

                                        </Form.Group>

                                    </Col>

                                    <Col style={{ "marginLeft": "50px" }}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>postal Code</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.shopPostalCode} onChange={this.changeShopPostalCode} name="shopPostalCode" />



                                        </Form.Group>




                                    </Col>



                                </Row>

                                <Row>
                                    <Col xs={2}>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Address No</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.shopAdress} onChange={this.changeShopAddressNo} name="shopAdress" />

                                        </Form.Group>

                                    </Col>

                                    <Col xs={3} style={{ "marginLeft": "100px" }}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Lane</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.shopLane} onChange={this.changeShopAddressLane} name="shopLane" />


                                        </Form.Group>




                                    </Col>

                                    <Col style={{ "marginLeft": "50px" }}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>City</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.shopCity} onChange={this.changeShopAddressCity} name="shopCity" />



                                        </Form.Group>




                                    </Col>



                                </Row>

                            </div>

                            <h5 style={{ "marginTop": "15px" }}><BsRecord2Fill style={{ "fontSize": "40px", "marginLeft": "-30px" }} /> Product Details</h5>

                            <div className={AccountCSS.form}>

                                <Row>

                                    <Col xs={4}>


                                        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Product Type</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.productType} onChange={this.changeProductType} name="phoneNumber" />


                                        </Form.Group> */}

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Select value={this.state.productType} onChange={this.changeProductType} name="category" >
                                                <option disabled></option>
                                                <option value="Smart Cream Cracker">Smart Cream Cracker</option>
                                                <option value={"Nice"}>Nice</option>
                                                <option value={"Orange Cream"}>Orange Cream</option>
                                                <option value={"Lemon Puff"}>Lemon Puff</option>
                                                <option value={"Krisko"}>Krisko</option>
                                                <option value={"other"}>Other</option>

                                            </Form.Select>

                                        </Form.Group>




                                    </Col>


                                    <Col xs={1} style={{ "marginLeft": "100px" }}>


                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif" }}>QTY</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                            <Form.Control type="text" value={this.state.productqty} onChange={this.changeQty} name="phoneNumber" />



                                        </Form.Group>




                                    </Col>

                                    <Col>

                                        <div className={AccountCSS.productContainer}>


                                            {this.state.products.length == 0 && <span style={{"marginLeft":"170px","marginTop":"100px","paddingTop":"20px","float":"left","color":"#d0d3db","fontWeight":"bolder","fontSize":"xx-large"}}>NO PRODUCT SELECTED</span>}


                                            {this.state.products &&

                                                this.state.products.map((obj, index) => (
                                                    <p style={{ "backgroundColor": "#b8cae4", "padding": "10", "fontWeight": "350", "WebkitTextStroke": "thin", "marginBottom": "12px" }} ><span style={{ "marginLeft": "20px", "fontSize": "x-large" }}>{index + 1 + "."}</span><span style={{ "marginLeft": "40px", "fontSize": "x-large" }}>{obj.productName}</span>{" "}<span style={{ "marginLeft": "240px", "fontSize": "x-large", "float": "right", "marginRight": "35px" }}>{obj.productQty + " QTY"}</span></p>
                                                ))


                                            }


                                        </div>


                                    </Col>

                                    <Col>
                                        <Button style={{ "width": "110px", "fontWeight": "600", "height": "fit-content", "marginLeft": "5px", "backgroundColor": "rgba(40, 123, 212, 1)", "marginTop": "-350px" }} onClick={this.onAddProduct}>ADD</Button>

                                    </Col>



                                </Row>

                                <Row>

                                    <Col>

                                    </Col>

                                    <Col>


                                        <div style={{ "marginLeft": "430px", "marginTop": "60px", "flex": "none" }}>

                                            <Row>


                                                <Col xs={2}>

                                                    <Button style={{ "width": "110px", "fontWeight": "600" }} onClick={this.clearDetails}>CLEAR</Button>


                                                </Col>

                                                <Col style={{ "marginLeft": "100px" }}>

                                                    <Button style={{ "width": "110px", "fontWeight": "600" }} type="submit">UPDATE</Button>

                                                </Col>


                                            </Row>
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

export default updateShop;


