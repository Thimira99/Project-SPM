import React, { Component } from 'react';
import DistributionNavbar from '../../components/Distribution Management/distributionNavBar';
import axios from 'axios';
import regCompanytStyles from './regCompanies.module.scss'
import {FaRegDotCircle} from "react-icons/fa";

export default class regCompany extends Component{

    constructor(props){
        super(props);

        this.state={
            reg_id:"",
            company_name:"",
            company_address:"",
            regDate:"",
                        
            companies:[],

               /** */
        errorId:{},
        errorName:{},
        errorAddr:{},
        errorRegDate:{},
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
    this.setState({status:e.target.value})
    console.log("handle",e.target.value)
}

formValidation = () =>{
    const{reg_id, company_name,company_address,regDate}=this.state;
    let isValid = true;
    const errorId={};
    const errorAddr ={};
    const errorName = {};
    const errorRegDate={};

    if(!reg_id.match(/^[S][H][K][C][0-9]{3,}$/)){
        errorId["idInput"] = "Reg Id should contain S,H,K,C uppercase letters and at least 3 numbers"
        isValid=false;
    }

    if(!reg_id){
        errorId["idInput"]="Reg Id Field is EMPTY!"
        isValid=false;
    }

    if(!company_address.match(/^[a-z A-Z]*$/)){
      errorAddr["addressInput"] = "Address must contain characters only!";
        isValid=false;
    }

    if(!company_address){
        errorAddr["addressInput"]="Address Field is EMPTY!";
        isValid=false;
    }
  
    if(!company_name){
      errorName["regPriceInput"]="Regular Price Field is EMPTY!";
        isValid=false;
    }
   
    if(!regDate){
        errorRegDate["regDate"] = "Date feild is EMPTY!"
        isValid=false;
    }

       
    this.setState({errorId:errorId, errorAddr:errorAddr,errorName:errorName,errorRegDate:errorRegDate});
    return isValid;
  }

  /** */

  onSubmit=(e)=>{
    e.preventDefault();

    /** */
   
    const isValid = this.formValidation();
    if(isValid){
    const{reg_id,company_name,company_address,regDate,product_id}= this.state;

    const data={
        reg_id:reg_id,
        company_name:company_name,
        company_address:company_address,
        regDate:regDate,
        product_id:product_id
    }
        
    console.log(data);

    axios.post("http://localhost:8000/companies/create",data).then((res)=>{
      if(res.data.success){
        alert("Company added Successfully!")
        window.location.href='/companies';
        this.setState(
          {
            reg_id:"",
            company_name:"",
            company_address:"",
            regDate:"",
            product_id:""
            
          }
        )
      }
    })

    
    }
}

componentDidMount(){
    this.retrieveCompanies();
}

retrieveCompanies(){
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
        const{errorAddr}=this.state;
        const{errorName}=this.state;
        const{errorRegDate}=this.state;
        
        return(
            <>
                <DistributionNavbar/>
                <br/>
                <h3 className={regCompanytStyles.heading}>COMPANY REGISTRATION</h3>
                {/* <hr style={{color:'black',"marginTop": "2px", "width": "1520px"}}/> */}
                <br/>
                <div className={regCompanytStyles.main}>
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
                            }}><FaRegDotCircle/> &nbsp; Company Details</h5>
                            <br/>
                            <div class="mb-3">
                                <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'20px'
                                }}>
                                REGISTRATION NUMBER
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="reg_id"
                                    placeholder="Enter company id"
                                    value={this.state.reg_id}
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
                            }}><FaRegDotCircle/> &nbsp; Inventory Details</h5>
                            <br/>
                            <div class="mb-3">
                                <label  class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'-30px'
                                }}>
                                REGISTERED DATE
                                </label>
                                <input 
                                    type="date"
                                    className="form-control"
                                    name="regDate"
                                    placeholder="Enter Registered date"
                                    value={this.state.regDate}
                                    onChange={this.handleInputChange}
                                    style={{marginLeft:'-30px'}}
                                    />
                                    {Object.keys(errorRegDate).map((key)=>{
                                    return <div style={{color:'red'}} key={key}>{errorRegDate[key]}</div>
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
                                COMPANY NAME
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="company_name"
                                    placeholder="Enter name"
                                    value={this.state.company_name}
                                    onChange={this.handleInputChange}
                                    style={{
                                        marginLeft:'20px'
                                    }}
                                    />
                                    {Object.keys(errorName).map((key)=>{
                                    return <div style={{color:'red',marginLeft:'20px',}} key={key}>{errorName[key]}</div>
                            })}
                                
                            </div>
                            </div>
                            <div class="col-lg-5" style={{
                                marginLeft:'150px'
                            }}>
                            <div class="mb-3">
                            <button class="btn btn-outline-primary" type="submit" style={{
                                width:'auto',
                                height:'auto',
                                fontWeight:'600',
                                marginTop:'10px',
                                marginLeft:'20px'
                                }} onClick={this.onSubmit}>
                            
                                &nbsp; Add &nbsp;
                            </button>

                            <button class="btn btn-outline-secondary" type="submit" 
                                style={{
                                marginLeft:'20px',
                                width:'auto',
                                fontWeight:'600',
                                marginTop:'12px'
                                }}
                                onClick={this.onCancel}
                            >
                            &nbsp; Cancel &nbsp;    
                            </button>
                            <br/>
                            </div>
                            </div>
                            </div>
                            <br/>
                            <div className='Row'>
                            <div class="col-lg-5">
                            <div class="mb-3">
                            <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'0px'
                                }}>
                                    COMPANY ADDRESS
                                </label>
                                <textarea   
                                    type="text"
                                    className="form-control"
                                    name="company_address"
                                    placeholder="Enter address"
                                    value={this.state.company_address}
                                    onChange={this.handleInputChange}
                                   />
                                    {Object.keys(errorAddr).map((key)=>{
                                    return <div style={{color:'red',marginLeft:'20px',}} key={key}>{errorAddr[key]}</div>
                            })}
                                
                            </div>
                            </div>
                          
                            </div>
                            <br/>
                        </form>
                    </div>
            

                    
                </div>
            </>
        )
    }

}
