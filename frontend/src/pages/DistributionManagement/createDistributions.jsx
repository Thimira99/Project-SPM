import React, { Component } from 'react';
import DistributionNavbar from '../../components/Distribution Management/distributionNavBar';
import axios from 'axios';
import distributionStyles from './createDistributions.module.scss'
import {FaRegDotCircle} from "react-icons/fa";

export default class createDistributions extends Component{

    constructor(props){
        super(props);

        this.state={
            distribution_id:"",
            stock_count:"",
            company:"",
            assignedRep:"",
            amount:"",
            product_id:"",
           
            companies:[],

               /** */
        errorId:{},
        errorCount:{},
        errorCom:{},
        errorRep:{},
        errorAmount:{},
        errorProId:{}
        
        };
        this.handleInputSelect=this.handleInputSelect.bind(this)
    }

    handleInputChange=(e)=>{
        console.log("messgae",e)
        const {name,value} = e.target;

      this.setState({
          ...this.state,
          [name]:value
      }) 
  }


  handleInputSelect=(e)=>{
    this.setState({company:e.target.value})
    console.log("handle",e.target.value)
}

formValidation = () =>{
    const{distribution_id, stock_count,company,assignedRep,amount,product_id}=this.state;
    let isValid = true;
    const errorId={};
    const errorCount ={};
    const errorCom = {};
    const errorRep = {};
    const errorAmount={};
    const errorProId={};

    if(!distribution_id.match(/^[S][H][K][D][0-9]{3,}$/)){
        errorId["idInput"] = "Product Id should contain S,H,K,D uppercase letters and at least 3 numbers"
        isValid=false;
    }

    if(!distribution_id){
        errorId["idInput"]="Product Id Field is EMPTY!"
        isValid=false;
    }

    if(!company){
        errorCom["companyInput"]="Company name Field is EMPTY!"
    }
  
    if(!assignedRep){
        errorRep["repInput"]="Sales rep Field is EMPTY!";
        isValid=false;
    }
  
    if(!amount.match(/^[0-9]*$/)){
        errorAmount["priceInput"] = "Amount can contain numbers Only!";
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

    if(!product_id){
        errorProId["productIdInput"] = "Product id Field is EMPTY!";
        isValid=false;
    }
  
      
    this.setState({errorId:errorId, errorCom:errorCom,errorRep:errorRep,errorAmount:errorAmount,errorCount:errorCount,errorProId:errorProId});
    return isValid;
  }

  /** */

  onSubmit=(e)=>{
    e.preventDefault();

    /** */
   
    const isValid = this.formValidation();
    if(isValid){
    const{distribution_id,stock_count,company,assignedRep,amount,product_id}= this.state;

    const data={
        distribution_id:distribution_id,
        stock_count:stock_count,
        company:company,
        assignedRep:assignedRep,
        amount:amount,
        product_id:product_id
        
    }
        
    console.log(data);

    axios.post("http://localhost:8000/distribution/create",data).then((res)=>{
      if(res.data.success){
        alert("Distributions added Successfully!")
        window.location.href='/distributions';
        this.setState(
          {
            distribution_id:"",
            stock_count:"",
            company:"",
            assignedRep:"",
            amount:"",
            product_id:"",
            
          }
        )
      }
    })

    
    }
}

componentDidMount(){
    this.retrieveCompaniess();
}

retrieveCompaniess(){
    axios.get("http://localhost:8000/retrieve/companies").then(res=>{
        if(res.data.success){
            this.setState({
                companies:res.data.existingCompanies
            });
            console.log(this.state.companies)
        }
    });
}

onCancel(){
    window.location.reload();
}

    render(){
        const {errorId}= this.state;
        const{errorCom}=this.state;
        const{errorCount}=this.state;
        const{errorRep}=this.state;
        const{errorProId}=this.state;
        const {errorPrice}= this.state
        
        return(
            <>
                <DistributionNavbar/>
                <br/>
                <h3 className={distributionStyles.heading}>DISTRIBUTION REGISTRATION</h3>
                {/* <hr style={{color:'black',"marginTop": "2px", "width": "1520px"}}/> */}
                <br/>
                <div className={distributionStyles.main}>
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
                            }}><FaRegDotCircle/> &nbsp; Distribution Details</h5>
                            <br/>
                            <div class="mb-3">
                                <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'20px'
                                }}>
                                DISTRIBUTION ID
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="distribution_id"
                                    placeholder="Enter product id"
                                    value={this.state.distribution_id}
                                    onChange={this.handleInputChange}
                                    required
                                    style={{marginLeft:'20px'}}
                                    />
                                    {Object.keys(errorId).map((key)=>{
                                    return <div style={{color:'red',marginLeft:'20px',}} key={key}>{errorId[key]}</div>
                            })}
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
                                STOCK COUNT
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="stock_count"
                                    placeholder="Enter regular price"
                                    value={this.state.stock_count}
                                    onChange={this.handleInputChange}
                                    style={{marginLeft:'-30px'}}
                                    />
                                    {Object.keys(errorCount).map((key)=>{
                                    return <div style={{color:'red'}} key={key}>{errorCount[key]}</div>
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
                                    marginLeft:'20px'
                                }}>
                                COMPANY
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="company"
                                    placeholder="Enter product id"
                                    value={this.state.company}
                                    onChange={this.handleInputChange}
                                    required
                                    style={{marginLeft:'20px'}}
                                    />
                                    {Object.keys(errorCom).map((key)=>{
                                    return <div style={{color:'red',marginLeft:'20px',}} key={key}>{errorCom[key]}</div>
                            })}
                                
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
                                    PRODUCT ID
                                </label>
                                <br/>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="product_id"
                                    placeholder="Enter regular price"
                                    value={this.state.product_id}
                                    onChange={this.handleInputChange}
                                    style={{marginLeft:'-30px'}}
                                    />
                                    {Object.keys(errorProId).map((key)=>{
                                    return <div style={{color:'red'}} key={key}>{errorProId[key]}</div>
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
                                    marginLeft:'20px'
                                }}>
                               SALES REPS
                            </label>
                            <input 
                                    type="text"
                                    className="form-control"
                                    name="assignedRep"
                                    placeholder="Enter sales rep"
                                    value={this.state.assignedRep}
                                    onChange={this.handleInputChange}
                                    style={{marginLeft:'20px'}}
                                    />
                                    {Object.keys(errorRep).map((key)=>{
                                    return <div style={{color:'red',marginLeft:'20px'}} key={key}>{errorRep[key]}</div>
                            })}
                            </div>
                            </div>
                            {/* <div class="col-lg-5" style={{
                                marginLeft:'150px'
                            }}> */}
                            {/* <div class="mb-3">
                                <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'-30px'
                                    }}>
                                    Amount
                                </label>
                                <br/>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="amount"
                                    placeholder="Enter price"
                                    value={this.state.amount}
                                    onChange={this.handleInputChange}
                                    style={{marginLeft:'-30px'}}
                                    />
                                    {Object.keys(errorPrice).map((key)=>{
                                    return <div style={{color:'red'}} key={key}>{errorPrice[key]}</div>
                            })}
                            </div>
                            </div> */}
                            </div>
                            <br/>

                           
                            <button class="btn btn-outline-primary" type="submit" style={{
                                width:'auto',
                                height:'auto',
                                fontWeight:'600',
                                marginTop:'-150px',
                                marginLeft:'500px'
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
