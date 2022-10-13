import React, { Component } from 'react';
import StockNavbar from '../../components/Stock Management/StockNavBar';
import axios from 'axios';
import stockManagementStyles from './createStocks.module.scss'
import {FaRegDotCircle} from "react-icons/fa";
//import toast msg
import { toastMsg } from '../../toast.js';

export default class createStocks extends Component{

    constructor(props){
        super(props);

        this.state={
            product_id:"",
            product_type:"",
            product_name:"",
            regular_price:"",
            status:"",
            stock_count:"",
            reg_date:"",
            stocks:[],

               /** */
        errorId:{},
        erroridEmp:{},
        errorType:{},
        errorName:{},
        errorPrice:{},
        errorCount:{},
        errorRegDate:{},
        };
        this.handleInputSelect=this.handleInputSelect.bind(this);
        this.handleIdInputSelect=this.handleIdInputSelect.bind(this);
        this.handleNameInputSelect=this.handleNameInputSelect.bind(this);
        this.handleTypeInputSelect=this.handleTypeInputSelect.bind(this)
    }

    handleInputChange=(e)=>{
        console.log("messgae",e)
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
  
  handleInputSelect=(e)=>{
    this.setState({status:e.target.value})
    console.log("handle",e.target.value)
}
    handleIdInputSelect=(e)=>{
        this.setState({product_id:e.target.value})
        console.log("handle id",e.target.value)
}

    handleNameInputSelect = (e)=>{
        this.setState({product_name:e.target.value})
        console.log("handle name",e.target.value)
    }

    handleTypeInputSelect = (e)=>{
        this.setState({product_type:e.target.value})
        console.log("handle type",e.target.value)
    }

formValidation = () =>{
    const{product_id, product_type,product_name,regular_price,stock_count,reg_date}=this.state;
    let isValid = true;
    // const errorId={};
    const errorType ={};
    const errorName = {};
    const errorPrice = {};
    const errorCount={};
    const errorRegDate={};

    // if(!product_id.match(/^[S][H][K][0-9]{3,}$/)){
    //     errorId["idInput"] = "Product Id should contain S,H,K uppercase letters and at least 3 numbers"
    //     isValid=false;
    // }

    // if(!product_id){
    //     errorId["idInput"]="Product Id Field is EMPTY!"
    //     isValid=false;
    // }

    // if(!product_type.match(/^[a-z A-Z]*$/)){
    //   errorType["productTypeInput"] = "Product Type must contain characters only!";
    //     isValid=false;
    // }

    if(!product_type){
        errorType["productTypeInput"]="Product type Field is EMPTY!"
    }
  
    if(!regular_price){
      errorPrice["regPriceInput"]="Regular Price Field is EMPTY!";
        isValid=false;
    }
  
    if(!regular_price.match(/^[0-9]*$/)){
        errorPrice["regPriceInput"] = "Price can contain numbers Only!";
        isValid=false;
    }

    if(!stock_count.match(/^[0-9]*$/)){
        errorCount["countError"] = "Count can contain numbers Only!";
        isValid=false;
    }
  
    if(!stock_count){
        errorCount["countError"] = "Name Field is EMPTY!";
        isValid=false;
    }

    if(!product_name){
        errorName["productNameInput"] = "Name Field is EMPTY!";
        isValid=false;
    }
  
    if(!reg_date){
        errorRegDate["regDate"] = "Date feild is EMPTY!"
    }

       
    this.setState({errorType:errorType,errorPrice:errorPrice,errorCount:errorCount,errorName:errorName,errorRegDate:errorRegDate});
    return isValid;
  }

  /** */

  onSubmit=(e)=>{
    e.preventDefault();

    /** */
   
    const isValid = this.formValidation();
    if(isValid){
    const{product_id,product_type,product_name,regular_price,status,stock_count,reg_date}= this.state;

    const data={
        product_id:product_id,
        product_type:product_type,
        product_name:product_name,
        regular_price:regular_price,
        status:this.state.stock_count > 0 ? "IN STOCK":"OUT OF STOCK",
        stock_count:stock_count,
        reg_date:reg_date
    }
        
    console.log(data);

    axios.post("http://localhost:8000/stocks/create",data).then((res)=>{
      if(res.data.success){
        toastMsg("Stock added Successfully!",'success')
        window.location.href='/stockManagement';
        this.setState(
          {
            product_id:"",
            product_type:"",
            product_name:"",
            regular_price:"",
            status:"",
            stock_count:"",
            reg_date:""
          }
        )
      }
    })

    
    }
}

componentDidMount(){
    this.retrieveProducts();
}

retrieveProducts(){
    axios.get("http://localhost:8000/product/get").then(res=>{
        if(res.status==200){
            this.setState({
                stocks:res.data.existingProducts
            });
            console.log(this.state.stocks)
        }
    });
}

onCancel(){
    window.location.reload();
}

    render(){
        // const {errorId}= this.state;

        const{errorPrice}=this.state;
        const{errorCount}=this.state;
      
        const {errorRegDate} = this.state;
        
        return(
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
                    marginLeft:'-300px',
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
                                marginLeft:'60px',
                                marginTop:'50px'
                            }}><FaRegDotCircle/> &nbsp; Product Details</h5>
                            <br/>
                            <div class="mb-3">
                                <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'60px'
                                }}>
                                SELECT PRODUCT ID
                                </label>
                                <br/>
                                <select id="product_id" onChange={this.handleIdInputSelect} value={this.state.product_id} 
                                    className="btn btn-outline-secondary dropdown-toggle" 
                                    style={{marginLeft:'60px', width:'auto'}}>
                                    <option selected> Choose Product Id </option>
                                    {
                                        this.state.stocks.map((object) => (
                                        
                                            <option>{object.productId}</option>
                                        ))

                                    }

                                </select>
                                {/* <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'60px'
                                }}>
                                <br/>
                                PRODUCT ID
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="product_id2"
                                    value={this.state.product_id.substring(0,5)} 
                                    // value={this.state.regular_price}
                                    onChange={this.handleInputChange}
                                    style={{marginLeft:'60px'}}
                                    />
                                 */}
                            </div>
                            </div>
                                                        
                            <div class="col-lg-5" style={{
                                marginLeft:'150px',
                                
                            }}>
                            <h5 style={{
                                marginLeft:"-60px",
                                marginTop:'50px'
                            }}><FaRegDotCircle/> &nbsp; Stock Details</h5>
                            <br/>
                            <div class="mb-3">
                                <label  class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'-60px'
                                }}>
                                REGULAR PRICE
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="regular_price"
                                    placeholder='Enter regular price'
                                    // ={this.state.product_id.substring(5,20)} 
                                    value={this.state.regular_price}
                                    onChange={this.handleInputChange}
                                    style={{marginLeft:'-60px'}}
                                    />
                                    {Object.keys(errorPrice).map((key)=>{
                                    return <div style={{color:'red'}} key={key}>{errorPrice[key]}</div>
                            })}

                            </div>
                            </div>
                            </div>
                            <br/>
                            
                            <div class="row">
                            <div class="col-lg-5">
                            <div class="mb-3">
                            <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'60px'
                                }}>
                                PRODUCT TYPE
                                </label>
                                <br/>
                                <select id="product_type" onChange={this.handleTypeInputSelect} value={this.state.product_type} 
                                    className="btn btn-outline-secondary dropdown-toggle" 
                                    style={{marginLeft:'60px', width:'auto'}}>
                                    <option selected> Choose product type</option>
                                    {
                                        this.state.stocks.map((object) => (
                                        
                                            <option>{object.productType}</option>
                                        ))

                                    }

                                </select>
                            </div>
                            </div>
                            <div class="col-lg-5" style={{
                                marginLeft:'150px'
                            }}>
                            <div class="mb-3">
                                <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'-60px'
                                    }}>
                                    STATUS
                                </label>
                                <br/>   
                               <span 
                                    value={this.state.status}
                                    // onChange={this.handleValueChange}
                                    style={{marginLeft:'-60px', width:'auto'}}>
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
                                    marginLeft:'60px'
                                }}>
                                PRODUCT NAME
                            </label>
                            <br/>
                            <select id="product_name" onChange={this.handleNameInputSelect} value={this.state.product_name} 
                                    className="btn btn-outline-secondary dropdown-toggle" 
                                    style={{marginLeft:'60px', width:'auto'}}>
                                    <option selected> Choose product name</option>
                                    {
                                        this.state.stocks.map((object) => (
                                        
                                            <option>{object.productName}</option>
                                        ))

                                    }

                                </select>
                                {/* <input 
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
                                    {Object.keys(errorName).map((key)=>{
                                    return <div style={{color:'red',marginLeft:'20px',}} key={key}>{errorName[key]}</div>
                            })} */}
                            </div>
                            </div>

                            <div class="col-lg-5" style={{
                                marginLeft:'150px'
                            }}>
                            <div class="mb-3">
                                <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'-60px'
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

                                    style={{marginLeft:'-60px'}}
                                    />
                                    {Object.keys(errorCount).map((key)=>{
                                    return <div style={{color:'red'}} key={key}>{errorCount[key]}</div>
                            })}
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
                                    marginLeft:'-60px'
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
                                    {Object.keys(errorRegDate).map((key)=>{
                                    return <div style={{color:'red'}} key={key}>{errorRegDate[key]}</div>
                            })}
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
                                marginLeft:'60px'
                                }} onClick={this.onSubmit}>
                            
                                &nbsp; Add &nbsp;
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
