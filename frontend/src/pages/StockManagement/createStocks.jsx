import React, { Component } from 'react';
import StockNavbar from '../../components/StockNavBar';
import TopBar from '../../components/Topbar';
import axios from 'axios';
import stockManagementStyles from './createStocks.module.scss'


export default class createStocks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product_id: "",
            product_type: "",
            product_name: "",
            regular_price: "",
            status: "",
            stock_count: "",
            stocks: [],

            /** */
            errorId: {},
            erroridEmp: {},
            errorType: {},
            errorName: {},
            errorPrice: {},
            errorCount: {}

        };
        this.handleInputSelect = this.handleInputSelect.bind(this)
    }

    handleInputChange = (e) => {
        console.log("messgae", e)
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handleInputSelect = (e) => {
        this.setState({ status: e.target.value })
        console.log("handle", e.target.value)
    }

    formValidation = () => {
        const { product_id, product_type, product_name, regular_price, stock_count } = this.state;
        let isValid = true;
        const errorId = {};
        const errorType = {};
        const errorName = {};
        const errorPrice = {};
        const errorCount = {};

        if (!product_id.match(/^[A-Z]{4,}[0-9]{3,}$/)) {
            errorId["idInput"] = "Product Id should contain at least 4 uppercase letters and at least 3 numbers"
        }

        if (!product_id) {
            errorId["idEmpty"] = "Product Id Field is EMPTY!"
        }

        if (!product_type.match(/^[a-z A-Z]*$/)) {
            errorType["productTypeInput"] = "Product Type must contain characters only!";
            isValid = false;
        }

        if (!regular_price) {
            errorPrice["regPriceInput"] = "Regular Price Field is EMPTY!";
            isValid = false;
        }

        if (!stock_count.match(/^[0-9]*$/)) {
            errorCount["countError"] = "Count can contain numbers Only!";
            isValid = false;
        }

        if (!product_name) {
            errorName["productNameInput"] = "Name Field is EMPTY!";
            isValid = false;
        }


        this.setState({ errorType: errorType, errorPrice: errorPrice, errorCount: errorCount, errorName: errorName });
        return isValid;
    }

    /** */

    onSubmit = (e) => {
        e.preventDefault();

        /** */

        const isValid = this.formValidation();
        if (isValid) {
            const { product_id, product_type, product_name, regular_price, status, stock_count } = this.state;

            const data = {
                product_id: product_id,
                product_type: product_type,
                product_name: product_name,
                regular_price: regular_price,
                status: status,
                stock_count: stock_count,
            }

            console.log(data);

            axios.post("http://localhost:8000/stocks/create", data).then((res) => {
                if (res.data.success) {
                    alert("Stock added Successfully!")
                    window.location.href = '/stockManagement';
                    this.setState(
                        {
                            product_id: "",
                            product_type: "",
                            product_name: "",
                            regular_price: "",
                            status: "",
                            stock_count: "",
                        }
                    )
                }
            })


        }
    }

    componentDidMount() {
        this.retrieveStocks();
    }

    retrieveStocks() {
        axios.get("http://localhost:8000/retrieve/stocks").then(res => {
            if (res.data.success) {
                this.setState({
                    stocks: res.data.existingStocks
                });
                console.log(this.state.stocks)
            }
        });
    }
    render() {
        const { errorId } = this.state;
        const { errorType } = this.state;
        const { errorPrice } = this.state;
        const { errorCount } = this.state;
        const { errorName } = this.state;

        return (
            <>
                <div className={stockManagementStyles.main}>
                    <StockNavbar />
                    <div className='container'>
                        <h1 style={{
                            marginLeft: '450px',
                            marginTop: '10px'
                        }}>CREATE A STOCK!</h1>
                        <br />
                        <div className='card' style={{
                            border: 'none'
                        }}>

                            <form className='needs-validation' noValidate onSubmit={this.onSubmit} style={{
                                height: 'auto'
                            }}>
                                <div className='form-group'>
                                    <label style={{
                                        fontWeight: 'bold'
                                    }}>
                                        PRODUCT ID
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="product_id"
                                        placeholder="Enter product id"
                                        value={this.state.product_id}
                                        onChange={this.handleInputChange}
                                    />
                                    {Object.keys(errorId).map((key) => {
                                        return <div style={{ color: 'red' }} key={key}>{errorId[key]}</div>
                                    })}
                                </div>

                                <br />

                                <div className='form-group'>
                                    <label style={{
                                        fontWeight: 'bold'
                                    }}>
                                        PRODUCT TYPE
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="product_type"
                                        placeholder="Enter product name"
                                        value={this.state.product_type}
                                        onChange={this.handleInputChange}
                                    />
                                    {Object.keys(errorType).map((key) => {
                                        return <div style={{ color: 'red' }} key={key}>{errorType[key]}</div>
                                    })}
                                </div>

                                <br />

                                <div className='form-group'>
                                    <label style={{
                                        fontWeight: 'bold'
                                    }}>
                                        PRODUCT NAME
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="product_name"
                                        placeholder="Enter product name"
                                        value={this.state.product_name}
                                        onChange={this.handleInputChange}
                                    />
                                    {Object.keys(errorName).map((key) => {
                                        return <div style={{ color: 'red' }} key={key}>{errorName[key]}</div>
                                    })}
                                </div>

                                <br />

                                <div className='form-group'>
                                    <label style={{
                                        fontWeight: 'bold'
                                    }}>
                                        REGULAR PRICE
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="regular_price"
                                        placeholder="Enter regular price"
                                        value={this.state.regular_price}
                                        onChange={this.handleInputChange}
                                    />
                                    {Object.keys(errorPrice).map((key) => {
                                        return <div style={{ color: 'red' }} key={key}>{errorPrice[key]}</div>
                                    })}

                                    <br />

                                    <div className='form-group'>
                                        <label style={{
                                            fontWeight: 'bold'
                                        }}>
                                            STATUS
                                        </label>
                                        <br />
                                        <select id="status" onChange={this.handleInputSelect} value={this.state.status} className="btn btn-secondary dropdown-toggle">
                                            <option selected> Choose...</option>
                                            <option selected> In Stock</option>
                                            <option selected> Out Of Stock</option>

                                        </select>
                                    </div>

                                    <br />

                                    <div className='form-group'>
                                        <label style={{
                                            fontWeight: 'bold'
                                        }}>
                                            STOCK COUNT
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="stock_count"
                                            placeholder="Enter regular price"
                                            value={this.state.stock_count}
                                            onChange={this.handleInputChange}
                                        />
                                        {Object.keys(errorCount).map((key) => {
                                            return <div style={{ color: 'red' }} key={key}>{errorCount[key]}</div>
                                        })}
                                    </div>

                                </div>
                                <button className="btn btn-success" type="submit" style={{
                                    marginTop: '15px',
                                    marginBottom: '150px',
                                    backgroundColor: '#287BD4',
                                    fontWeight: 'bold'
                                }} onClick={this.onSubmit}>

                                    &nbsp;Add &nbsp;
                                </button>
                                <br />
                            </form>
                        </div>
                    </div>


                </div>
            </>
        )
    }

}
