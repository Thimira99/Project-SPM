import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from "react-router"; 
import StockNavbar from '../../components/Stock Management/StockNavBar';
import stockManagementStyles from './update.module.scss';
import {FaRegDotCircle} from "react-icons/fa";


export default class updateStocks extends Component {

    constructor(props){
        super(props);
        this.state={
            stockId: this.props.match.params.id,
            product_id:"",
            product_type:"",
            product_name:"",
            regular_price:"",
            status:"",
            stock_count:"",
            reg_date:"",
            stocks:[]
        }
    }

    handleInputChange=(e)=>{
        const {name,value} = e.target;

        if(name=='stock_count'){
            if(value==0){
                this.setState({
                    status:'OUT OF STOCK'
                })
            }
        }
        this.setState({
            ...this.state,
            [name]:value
        })
    }

    handleValueChange=(e)=>{
        this.setState({status:e.target.value})
        console.log("status",e.target.value)
    }
    
    onSubmit=(e)=> {
        e.preventDefault();
        /** */
            const id = this.props.match.params.id;

            const {product_id, product_type, product_name, regular_price,status,stock_count,reg_date} = this.state;

            const data = {
                product_id: product_id,
                product_type: product_type,
                product_name: product_name,
                status:this.state.stock_count > 0 ? "IN STOCK":"OUT OF STOCK",
                stock_count:stock_count,
                regular_price: regular_price,
                reg_date:reg_date,
            
            }

            console.log(data);

            axios.put(`http://localhost:8000/update/stocks/${id}`, data).then((res) => {
                if (res.status==200) {
                    alert("Stock Details Updated Successfully!")
                    window.location.href='/stockManagement';
                    this.setState(
                        {
                            product_id: "",
                            product_type: "",
                            product_name: "",
                            status:"",
                            stock_count:"",
                            regular_price: "",
                            reg_date:"",

                        }
                    )
                }
                console.log("updated data",data)
            })
        }
    
        updateData(){
            console.log("stock id",this.state.stockId)
            axios.get(`http://localhost:8000/retrieve/stock/${this.state.stockId}`).then((res) =>{
                console.log("response",res);
                this.setState({
                    product_id: res.data.stock.product_id,
                    product_type: res.data.stock.product_type,
                    product_name: res.data.stock.product_name,
                    status: res.data.stock.status,
                    stock_count: res.data.stock.stock_count,
                    regular_price: res.data.stock.regular_price,
                    reg_date: res.data.stock.reg_date
                })
            });
        }

        componentDidMount(){
                this.updateData();
        }

        onCancel(){
            window.location.href='/stockManagement';
        }
        

  render() {
    return (
        <>
        <StockNavbar/>
                <br/>
                <h3 className={stockManagementStyles.heading}>STOCK REGISTRATION</h3>
                {/* <hr style={{color:'black',"marginTop": "2px", "width": "1520px"}}/> */}
                <br/>
                <div className={stockManagementStyles.main}>
                <br/>
                
                <div className='card' style={{
                    marginTop:'60px',
                    marginLeft:'-420px',
                    width:'900px',
                    height:'fitContent',
                    border:'none'
                }}>
                    
                  
                  
                        <form className='needs-validation' noValidate onSubmit={this.onSubmit} style={{
                            height:'auto'
                        }}>
                            <div class="row">
                            <div class="col-lg-5">
                            <h5 style={{
                                marginLeft:'20px',
                                marginTop:'50px'
                            }}><FaRegDotCircle/> &nbsp; Product Details</h5>
                            <br/>
                            <div class="mb-3">
                                <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'20px'
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
                                    required
                                    style={{marginLeft:'20px'}}
                                    readOnly
                                    />
                                    
                            </div>
                            </div>
                            
                            <div class="col-lg-5" style={{
                                marginLeft:'150px',
                                
                            }}>
                            <h5 style={{
                                marginLeft:"-30px",
                                marginTop:'50px'
                            }}><FaRegDotCircle/> &nbsp; Stock Details</h5>
                            <br/>
                            <div class="mb-3">
                                <label  class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'-30px'
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
                                    style={{marginLeft:'-30px'}}
                                    />
                                   
                            </div>
                            </div>
                            </div>
                            <br/>
                            
                            <div class="row">
                            <div class="col-lg-5">
                            <div class="mb-3">
                            <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'20px'
                                }}>
                                PRODUCT TYPE
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="product_type"
                                    placeholder="Enter product type"
                                    value={this.state.product_type}
                                    onChange={this.handleInputChange}
                                    style={{
                                        marginLeft:'20px'
                                    }}
                                    />
                                    
                            </div>
                            </div>
                            <div class="col-lg-5" style={{
                                marginLeft:'150px'
                            }}>
                            <div class="mb-3">
                                <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'-30px'
                                    }}>
                                    STATUS
                                </label>
                                <br/>
                                {/* <select id="status" 
                                //onChange={this.handleInputSelect} 
                                value={this.state.status} className="btn btn-outline-secondary dropdown-toggle" style={{marginLeft:'-30px', width:'auto'}}>
                                    <option> Choose...</option>
                                    <option> In Stock</option>
                                    <option> Out Of Stock</option>
                                readOnly
                                </select> */}
                               <span 
                                value={this.state.status}
                                // onChange={this.handleValueChange}
                                style={{marginLeft:'-30px', width:'auto'}}>
                                   {this.state.stock_count > 0 ? "IN STOCK":"OUT OF STOCK"}
                               </span>
                            </div>
                            </div>
                            </div>
                            <br/>

                            <div class="row">
                            <div class="col-lg-5">
                            <div class="mb-3">
                            <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'20px'
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
                                    style={{
                                        marginLeft:'20px'
                                    }}
                                    />
                                   
                            </div>
                            </div>

                            <div class="col-lg-5" style={{
                                marginLeft:'150px'
                            }}>
                            <div class="mb-3">
                                <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'-30px'
                                    }}>

                                    STOCK COUNT
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="stock_count"
                                    placeholder="Enter stock count"
                                    value={this.state.stock_count}
                                    onChange={this.handleInputChange}
                                    // onKeyUp={e => this.handleKeyUp(e.target.value)}
                                    style={{marginLeft:'-30px'}}
                                    />
                                    
                            </div>
                            </div>
                            </div>
                            <br/>
                            <div class="row">
                            
                            <div class="col-lg-5"  style={{
                                marginLeft:'535px'
                            }}>
                            <div class="mb-3">
                            <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'-30px'
                                }}>
                                REGISTERED DATE <br/>
                                <input 
                                    type="date"
                                    className="form-control"
                                    name="reg_date"
                                    placeholder="Enter Registered date"
                                    value={this.state.reg_date}
                                    onChange={this.handleInputChange}
                                    // style={{marginLeft:'-30px'}}
                                    />
                                    
                            </label>
                            </div>
                            </div>
                            </div>
                            <br/>

                           
                            <button class="btn btn-outline-primary" type="submit" style={{
                                width:'auto',
                                height:'auto',
                                fontWeight:'600',
                                marginTop:'-150px',
                                marginLeft:'20px'
                                }} onClick={this.onSubmit}>
                            
                                &nbsp; Update &nbsp;
                            </button>

                            <button class="btn btn-outline-secondary" type="submit" 
                                style={{
                                marginLeft:'20px',
                                width:'auto',
                                fontWeight:'600',
                                marginTop:'-150px'
                                }}
                                onClick={this.onCancel}
                            >
                            &nbsp; Cancel &nbsp;    
                            </button>
                        <br/>
                        </form>
                    </div>
            

                    
                </div>
                </>
    )
  }
}
