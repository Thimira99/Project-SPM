import React, { createRef, Component } from 'react';
import SalesRepDashboard from '../../../../components/SalesRepDashboard';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import AccountCSS from './account.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import HashLoader from "react-spinners/HashLoader";
import Select from 'react-select';
import { BsTrashFill ,BsJustify } from "react-icons/bs";
import { MDBDataTable } from 'mdbreact';

class stockforShop extends Component {

    constructor(props) {
        super(props)

        this.state = {

            shopID: this.props.match.params.id,
            shopData: '',
            Date: '',
            Time: new Date(),
            AgentCode: "01AG",
            InvoiceNumber: '',
            InvoiceData: '',
            options: [],
            selectedOptions: [],
            loading: false,
            override: {
                display: "block",
                margin: "0 auto",
                borderColor: "red",
            },
            productPrice: '',
            productqty: '',
            totalAmount: '',
            billItemObj: [],
            totAmount: 0,
            usFormat: 0,
            allInvoices: [],
            data: '',
            Agent: ''
        }

        this.formData = createRef();
        this.changeProductData = this.changeProductData.bind(this);
        this.changeQty = this.changeQty.bind(this);
        this.onProductAdd = this.onProductAdd.bind(this);
        this.ItemDelete = this.ItemDelete.bind(this);
        this.onSaveProduct = this.onSaveProduct.bind(this);

    }

    onSaveProduct() {


        this.setState({
            loading: true
        })

        if (this.state.billItemObj.length != 0) {
            const num = (this.state.InvoiceNumber).slice(3)
            console.log("slice", num)

            const data = {

                "InvoiceNumber": num,
                "Date": this.state.Date,
                "Time": this.state.Time,
                "AgentNumber": this.state.Agent.firstName,
                "ShopName": this.state.shopData.sh_Name,
                "TotalAmount": this.state.totAmount
            }

            const url = 'http://localhost:8000/api/Invoice/post';

            axios.post(url, data).then((res) => {
                console.log("sukitha", res.data.code)
                if (res.data.code === '200') {

                    const url = 'http://localhost:8000/api/InvoiceProduct/post';

                    const Postdata = {
                        "InvoiceNumber": num,
                        "AgentNumber": this.state.Agent.firstName,
                        "ShopName": this.state.shopData.sh_Name,
                        "TotalAmount": this.state.totAmount,
                        "productData": this.state.billItemObj
                    }

                    axios.post(url, Postdata).then((res) => {

                        if (res.data.code === '200') {

                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: "Data Added successfully",
                                showConfirmButton: false,
                                timer: 1500
                            }, () => {
                                this.state({
                                    loading: false
                                })
                            })
                            this.setState({
                                billItemObj: [],
                                usFormat: 0,

                            })

                            this.getShopData();

                        } else {

                            Swal.fire({
                                position: 'top-end',
                                icon: 'warning',
                                title: "Cant Save the product",
                                showConfirmButton: false,
                                timer: 1500
                            })

                            const url = 'http://localhost:8000/api/Invoice/get/shop/delete';

                            const data = {
                                "InvoiceNumber": num,
                                "ShopName": this.state.shopData.sh_Name,
                                "AgentNumber": this.state.AgentCode
                            }

                            axios.post(url, data).then((res) => {
                                if (res.data.code == "200") {

                                } else {

                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'error',
                                        title: "delete error",
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                            })

                        }
                    })




                } else {

                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: "Cant Save the product",
                        showConfirmButton: false,
                        timer: 1500
                    })


                }
            })

        } else {

            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Select Product',
                showConfirmButton: false,
                timer: 1500
            })

        }


    }

    ItemDelete = (event) => {




        const indexOfArray = Number(event);
        console.log(indexOfArray)

        const number = this.state.billItemObj[indexOfArray].amount;
        console.log(number)


        this.setState((prevState) => (
            {
                totAmount: prevState.totAmount - number
            }
        ), () => {
            console.log("tot aaaa", this.state.totAmount)
            this.setState({
                usFormat: (this.state.totAmount).toLocaleString('en-US')
            })
        });



        var arrays = [...this.state.billItemObj];
        console.log(arrays);



        if (indexOfArray != -1) {
            arrays.splice(Number(event), 1);
            this.setState({ billItemObj: arrays });
        }


    }


    onProductAdd = (event) => {

        event.preventDefault();
        const total = Number(this.state.totAmount);

        const totAmount = parseInt(this.formData.current.amount.value)

        if (totAmount > 0) {

            var tot = parseInt(this.formData.current.amount.value);
            var tot2 = total + parseInt(this.formData.current.amount.value);
            console.log("tot", tot2)
            var usFormat = tot2.toLocaleString('en-US');
            console.log(usFormat)
            this.setState((prevState) => (
                {
                    totAmount: prevState.totAmount + tot,
                    usFormat: usFormat
                }
            ), () => {
                console.log("totAmount", this.state.totAmount)
                console.log("usFormat 2", this.state.usFormat)
            });



            const BillItemObj = {
                itemname: this.state.selectedOptions.label,
                price: this.formData.current.price.value,
                amount: this.formData.current.amount.value,
                qty: this.formData.current.qty.value,
            }



            this.state.billItemObj.push(BillItemObj);
            this.setState({
                billItemObj: this.state.billItemObj
            }, () => {
                console.log("bill ", this.state.billItemObj);

                this.setState({
                    selectedOptions: [],
                    productPrice: '',
                    productqty: '',
                    totalAmount: '',
                })
            });


        } else {

            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Amount Can not be 0.00',
                showConfirmButton: false,
                timer: 1500
            })

        }

    }

    changeQty = (event) => {

        this.setState({
            productqty: event.target.value > 0 ? event.target.value : 0
        }, () => {
            if (this.state.productPrice) {

                const { productPrice } = this.state;
                const amount = productPrice * Number(this.state.productqty)

                this.setState({
                    totalAmount: amount.toFixed(2)
                })

            }
        })
    }

    getSelectedProductData() {

        this.setState({
            loading: true
        })

        const { selectedOptions } = this.state;

        const url = 'http://localhost:8000/product/name/get';
        const data = {
            "productName": selectedOptions.label
        }



        axios.post(url, data).then((res) => {
            console.log(res.data.data.length)
            if (res.data.code == "200") {

                if (res.data.data.length != 0) {

                    const price = Number(res.data.data[0].price)

                    this.setState({
                        productPrice: price.toFixed(2)
                    }, () => {

                        this.setState({
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
                        selectedOptions: [],
                        loading: false
                    })
                }


            } else {

            }
        })

    }

    changeProductData = (selectedOptions) => {
        console.log(selectedOptions)
        this.setState({
            selectedOptions,

        }, () => {
            this.getSelectedProductData();
        });
    }

    onViewInvoice(Obj){

        console.log("obj",Obj)

        this.props.history.push(`/ViewInvoice/${Obj.InvoiceNumber}/${Obj.ShopName}/${this.state.shopData._id}`);   
    }


    getAllInvoiceByShopNameAndAgent() {

        if (this.state.shopData.sh_Name && this.state.AgentCode) {

            this.setState({
                loading: true
            })

            const url = 'http://localhost:8000/api/Invoice/get/shopByNameAndAgent';
            const data = {
                "AgentNumber": this.state.Agent.firstName,
                "ShopName": this.state.shopData.sh_Name
            }

            axios.post(url, data).then((res) => {
                console.log(res)
                if (res.data.code == '200') {


                    this.setState({
                        loading: false
                    })


                    this.setState({
                        allInvoices: res.data.data
                    }, () => {


                        const userAttributes = []
                        this.state.allInvoices.forEach(el => {
                            var num = Number(el.TotalAmount)

                            console.log(num.toLocaleString('en-US'))

                            userAttributes.push({
                                InvoiceNo: "INV" + el.InvoiceNumber,
                                Amount: <><span style={{ "float": "right", "marginRight": "60px" }}>{num.toLocaleString('en-US') + ".00"}</span></>,
                                Date: el.Date,
                                action: <><span style={{"fontSize":"20px","fontWeight":"600"}}><BsJustify onClick={() => this.onViewInvoice(el)} /></span></>

                            })
                        });

                        this.setState({
                            data: {
                                columns: [
                                    {
                                        label: 'InvoiceNo',
                                        field: 'InvoiceNo',
                                        sort: 'asc',
                                        width: 120,

                                    },
                                    {
                                        label: 'Amount',
                                        field: 'Amount',
                                        sort: 'asc',
                                        width: 130
                                    },
                                    {
                                        label: 'Date',
                                        field: 'Date',
                                        sort: 'asc',
                                        width: 130,

                                    },

                                    {
                                        label: 'ACTION ',
                                        field: 'action',
                                        sort: 'asc',
                                        width: 50
                                    }
                                ],
                                rows: userAttributes
                            }
                        })

                    })


                } else {

                }
            })
        }

    }

    getShopData() {

        this.setState({
            loading: true
        })

        const url = `http://localhost:8000/api/account/get/${this.state.shopID}`;

        axios.get(url).then((res) => {
            if (res.data.success) {

                this.setState({
                    shopData: res.data.supplier
                }, () => {
                    this.setState({
                        loading: false
                    })

                    const dataArrey = [];
                    this.state.shopData.productData.forEach(obj => {
                        dataArrey.push({
                            value: obj._id, label: obj.productName
                        })
                    });

                    this.setState({
                        options: dataArrey
                    })

                    console.log(this.state.shopData)
                    this.getInvoiceNumber();
                    this.getAllInvoiceByShopNameAndAgent();
                })
            }

        })

    }


    getDate() {

        let MyDate = new Date();
        let MyDateString;

        MyDate.setDate(MyDate.getDate());

        MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'
            + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/'
            + MyDate.getFullYear();

        this.setState({
            Date: MyDateString
        })


    }

    callme() {
        setInterval(() => {
            this.setState({ Time: new Date() });
        }, 1000);
    }

    setInvoiceNumber() {

        const invoiceNumberData = Number(this.state.InvoiceData[this.state.InvoiceData.length - 1].InvoiceNumber);
        const newNumber = invoiceNumberData + 1;
        this.setState({
            InvoiceNumber: "INV" + newNumber
        })

    }

    createNewInvoiceNumber() {

        this.setState({
            InvoiceNumber: "INV" + 1
        })
    }

    getInvoiceNumber() {

        this.setState({
            loading: true
        })

        const url = 'http://localhost:8000/api/Invoice/get/shop';

        const data = {
            "ShopName": this.state.shopData.sh_Name
        }

        axios.post(url, data).then((res) => {
            console.log(res)
            if (res.data.code == "200") {

                const data = res.data.data;
                if (data.length != 0) {

                    this.setState({
                        InvoiceData: res.data.data
                    }, () => {
                        this.setState({
                            loading: false
                        })
                        this.setInvoiceNumber();
                    })

                } else {
                    this.setState({
                        loading: false
                    })

                    this.createNewInvoiceNumber();


                }



            } else {

                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })

                this.setState({
                    loading: false
                })
            }
        })

    }

    getAgent() {

        const Agent = JSON.parse(localStorage.getItem('user'));
        this.setState({
            Agent:Agent
        })
      
    }


    componentDidMount() {
        this.getShopData();
        this.getDate();
        this.getAgent();


    }

    render() {
        const { selectedOptions, totAmount } = this.state;
        return (

            <>
                <SalesRepDashboard />

                <Row>

                    <div className={AccountCSS.container}>

                        <div style={{ "margin": "20px" }}>
                            <Row >

                                <Col>


                                    <Row >
                                        <Form.Group className="mb-4" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif", "fontWeight": "500", "fontSize": "18px" }}>Shop Name</span></Form.Label>
                                            <Form.Control type="text" value={this.state.shopData.sh_Name} onChange={this.changeShopName} name="shopName" />

                                        </Form.Group>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label><span style={{ "fontFamily": "sans-serif", "fontWeight": "500", "fontSize": "18px" }}>Invoice Number</span></Form.Label>
                                                <Form.Control type="text" value={this.state.InvoiceNumber} onChange={this.changeShopName} name="shopName" />
                                            </Form.Group>

                                        </Col>
                                        <Col>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label><span style={{ "fontFamily": "sans-serif", "fontWeight": "500", "fontSize": "18px" }}>Agent Name</span></Form.Label>
                                                <Form.Control type="text" value={this.state.Agent.firstName} onChange={this.changeShopName} name="shopName" />
                                            </Form.Group>

                                        </Col>

                                    </Row>


                                </Col>

                                <Col xs={2}>


                                    <Row xs={2}>
                                        <Form.Group className="mb-4" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif", "fontWeight": "500", "fontSize": "18px" }}>Date</span></Form.Label>
                                            <Form.Control type="text" value={this.state.Date} onChange={this.changeShopName} name="shopName" />

                                        </Form.Group>
                                    </Row>

                                    <Row xs={2}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{ "fontFamily": "sans-serif", "fontWeight": "500", "fontSize": "18px" }}>Time</span></Form.Label>
                                            <Form.Control type="text" value={this.state.Time.toLocaleTimeString()} onChange={this.changeShopName} {...this.callme()} name="shopName" />

                                        </Form.Group>
                                    </Row>


                                </Col>
                                <Col>


                                    <div className={AccountCSS.productContainer}>
                                        <span style={{ "color": "white", "float": "right", "fontSize": "55px", "marginRight": "30px", "marginTop": "20px" }}>{"Rs : " + this.state.usFormat}</span>
                                    </div>

                                    <div style={{ "float": "right", "marginBottom": "10px", "marginTop": "25px" }}>
                                        <Button size="sm" style={{ "width": "110px", "fontWeight": "600", "marginleft": "1480px", "fontSize": "small" }} type="submit" onClick={this.onSaveProduct} >SAVE</Button>
                                    </div>

                                </Col>



                            </Row>

                        </div>

                    </div>

                </Row>


                <div className={AccountCSS.tableContainer}>

                    <div style={{ "margin": "20px" }}>
                        <Form onSubmit={this.onProductAdd} ref={this.formData}>
                            <Row>


                                <Col xs={4}>

                                    <Form.Group className="mb-4" controlId="formBasicEmail">
                                        <Form.Label><span style={{ "fontFamily": "sans-serif", "fontWeight": "500", "fontSize": "18px" }}>Product Name</span></Form.Label>
                                        <Select

                                            value={selectedOptions}

                                            options={this.state.options}
                                            onChange={this.changeProductData}


                                        />

                                    </Form.Group>
                                </Col>

                                <Col xs={2}>

                                    <Form.Group className="mb-4" controlId="formBasicEmail">
                                        <Form.Label><span style={{ "fontFamily": "sans-serif", "fontWeight": "500", "fontSize": "18px" }}>Product Price</span></Form.Label>
                                        <Form.Control type="text" value={this.state.productPrice} onChange={this.changeShopName} name="price" />

                                    </Form.Group>
                                </Col>

                                <Col xs={2}>
                                    <Form.Group className="mb-4" controlId="formBasicEmail">
                                        <Form.Label><span style={{ "fontFamily": "sans-serif", "fontWeight": "500", "fontSize": "18px" }}>QTY</span></Form.Label>
                                        <Form.Control type="Number" value={this.state.productqty} onChange={this.changeQty} name="qty" />

                                    </Form.Group>

                                </Col>

                                <Col xs={2}></Col>

                                <Col>

                                    <Form.Group className="mb-4" controlId="formBasicEmail">
                                        <Form.Label><span style={{ "fontFamily": "sans-serif", "fontWeight": "500", "fontSize": "18px" }}>Amount</span></Form.Label>
                                        <Form.Control type="text" value={this.state.totalAmount} name="amount" />

                                    </Form.Group>

                                </Col>


                            </Row>


                            <div style={{ "float": "right", "marginBottom": "10px" }}>
                                <Button size="sm" style={{ "width": "110px", "fontWeight": "600", "marginleft": "1480px", "fontSize": "small" }} type="submit" >ADD</Button>
                            </div>
                        </Form>
                    </div>
                </div>

                <div className={AccountCSS.tableContainertwo}>
                    <div style={{ "margin": "20px" }}>
                        <Row>

                            <Col >

                                <Table striped hover variant="light" class="table table-hover " >

                                    <thead style={{ 'display': 'block' }} >
                                        <tr>
                                            <th style={{ "width": "25px", "font-size": "20px", "fontWeight": "500" }}></th>

                                            <th style={{ "width": "440px", "font-size": "20px", "fontWeight": "400" }}>Product Name:</th>
                                            <th style={{ "width": "135px", "font-size": "20px", "fontWeight": "400" }}>Cost Price:</th>
                                            <th style={{ "width": "90px", "font-size": "20px", "fontWeight": "400" }}>Qty:</th>
                                            <th style={{ "width": "140px", "font-size": "20px", "fontWeight": "400" }}>Amount:</th>
                                            <th style={{ "width": "80px", "font-size": "20px", "fontWeight": "400" }}>Option:</th>


                                        </tr>
                                    </thead>

                                    <tbody style={{ 'height': '280px', 'overflow': 'auto', 'display': 'block' }}>
                                        {
                                            this.state.billItemObj.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td style={{ 'width': '20px', "font-size": "16px", "fontWeight": "400" }}>{index + 1}</td>
                                                        <td style={{ 'width': '440px', "font-size": "16px", "fontWeight": "400" }}>{item.itemname}</td>
                                                        <td style={{ 'width': '135px', "font-size": "16px", "fontWeight": "400" }}>{"Rs." + item.price}</td>
                                                        <td style={{ 'width': '90px', "font-size": "16px", "fontWeight": "400" }}>{item.qty}</td>
                                                        <td style={{ 'width': '145px', "font-size": "16px", "fontWeight": "400" }}>{"Rs." + item.amount}</td>
                                                        <td style={{ 'width': '90px' }}>
                                                            <div style={{ "fontSize": "20px", "marginLeft": "15px" }}>
                                                                <BsTrashFill onClick={() => this.ItemDelete(index)} />

                                                            </div>

                                                        </td>

                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>

                                    <tfoot style={{ 'display': 'block' }}>
                                        {
                                            <tr>
                                                <th style={{ "width": "25px", "font-size": "small" }}></th>

                                                <th style={{ "width": "470px", "font-size": "small" }}></th>
                                                <th style={{ "width": "135px", "font-size": "small" }}></th>
                                                <th style={{ "width": "120px", "font-size": "small" }}>{this.state.curentqty1}</th>
                                                <th style={{ "width": "150px", "font-size": "16px", "fontWeight": "400" }}>{"Rs." + this.state.usFormat + ".00"}</th>
                                                <th style={{ "width": "90px", "font-size": "small" }}></th>


                                            </tr>
                                        }
                                    </tfoot>

                                </Table>


                            </Col>

                            <Col xs={5}>

                                <div style={{ "marginLeft": "10px" }}>

                                    <MDBDataTable


                                        scrollY
                                        maxHeight="280px"
                                        loading={false}
                                        hover
                                        bordered



                                        data={this.state.data}
                                        className={AccountCSS.yourcustomstyles}
                                    />
                                </div>

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

export default stockforShop;