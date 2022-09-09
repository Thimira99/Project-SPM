import React, { Component } from 'react'
import axios from 'axios';
import ProductManagerDashboard from '../../../../components/ProductManagerDashboard/ProductManagerDashboard';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import AccountCSS from './account.module.css';
import { BsRecord2Fill } from "react-icons/bs";

export default class AddMaterial extends Component {

  constructor(props){
    super(props);
    this.state={
        
        dateCreated:"",
        materialId:"",
        supplier:"",
        cost:"", 
        weight:"",   
        status:"",    
       
         /** */
        errorA:{},
        errorB:{},
        errorC:{},
        errorD:{},
    }
  }
    handleInputChange=(e)=>{
      const {name,value} = e.target;

      this.setState({
          ...this.state,
          [name]:value
      })
  }

/** */
formValidation = () =>{
  const{materialId,supplier,cost, weight}=this.state;
  let isValid = true;
  const errorA ={};
  const errorB={};
  const errorC={};
  const errorD={};

  if(!materialId){
      errorA["materialIdInput"] = "Material Id Field is EMPTY!";
      isValid=false;
  }

  if(!supplier){
    errorB["supplierFieldInput"] = "Supplier Field is EMPTY!";
    isValid=false;
  }
    if(!cost){
        errorC["costFieldInput"] = "Cost Field is EMPTY!";
        isValid=false;
    }
    if(!weight){
      errorD["weightFieldInput"] = "Weight Field is EMPTY!";
      isValid=false;
  }
  if(!materialId.match(/^[a-z A-Z 1-9]*$/)){
      errorA["materialIdInputPattern"] = "Material Id must contain characters only!";
      isValid=false;
  }


   



  this.setState({errorA:errorA,errorB:errorB,errorC:errorC,errorD:errorD});
  return isValid;
}
/** */

  onSubmit=(e)=>{
    e.preventDefault();

    /** */
    const isValid = this.formValidation();
    if(isValid){


    const{dateCreated,materialId,supplier,cost,weight,status}= this.state;

       
    const data={
        
        dateCreated:dateCreated,
        materialId:materialId,
        supplier:supplier,
        cost:cost, 
        weight:weight,
        status:status
    }
        
    console.log(data);

    axios.post("http://localhost:8000/material/post",data).then((res)=>{
      if(res.data.success){
        alert("Material added Successfully!");
        window.location.href='/materialList';
        this.setState(
          {
            dateCreated:"",
            materialId:"",
            supplier:"",
            cost:"",
            weight:"",
            status:"" 
          }
        )
      }
    })
}
}

  
  render() {

    const{errorA}=this.state;
    const{errorB}=this.state;
    const{errorC}=this.state;
    const{errorD}=this.state;

    return (
        <>
        <ProductManagerDashboard/>


        <Row>
      <div className='container'>
      <div className = 'card' style={{marginLeft:'220px', marginTop:'20px', background: "#D3D3D3",height:'auto',width:'600px',marginRight:'100px'}}>
      <div className='col-md-8 mt-4 mx-auto'>
      
      

        <h3   style={{color: 'rgba(6, 21, 117)', fontWeight:'bold'}}> ADD MATERIAL </h3>
        <button className="btn btn-primary" style={{"width": "360px", "fontWeight": "600"}}>
        <a href="/materialList" style={{textDecoration:'none',color:'white', fontWeight:'bold',}}>
          MATERIAL LIST
        </a></button><br/> 
        <form className='needs-validation' noValidate onSubmit={this.onSubmit}>
         
          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>MATERIAL ID</label>
            <input 
              type="text"
              className="form-control"
              name="materialId"
              placeholder="Enter Material Id"
              value={this.state.materialId}
              onChange={this.handleInputChange}
            />
             {Object.keys(errorA).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorA[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>SUPPLIER</label>
            <input 
              type="text"
              className="form-control"
              name="supplier"
              placeholder="Enter Supplier"
              value={this.state.supplier}
              onChange={this.handleInputChange}
            />
            {Object.keys(errorB).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorB[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>WEIGHT</label>
            <input 
              type="text"
              className="form-control"
              name="weight"
              placeholder="Enter Weight"
              value={this.state.weight}
              onChange={this.handleInputChange}
            />
            {Object.keys(errorD).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorC[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>COST</label>
            <input 
              type="text"
              className="form-control"
              name="cost"
              placeholder="Enter Cost"
              value={this.state.cost}
              onChange={this.handleInputChange}
            />
            {Object.keys(errorC).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorC[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>STATUS</label>
            <input 
              type="text"
              className="form-control"
              name="status"
              placeholder="Enter Status"
              value={this.state.status}
              onChange={this.handleInputChange}
            />
          </div>

          {/* <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>STATUS</label>
                  <select id="status" value={this.state.status} onChange={this.handleChange} className="btn  dropdown-toggle">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
          </div> */}

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>DATE CREATED</label>
            <input 
              type="date"
              className="form-control"
              name="dateCreated"
              value={this.state.dateCreated}
              onChange={this.handleInputChange}
            />
          </div>

          <Row>
          <Col> 
          <button className="btn" type="submit" style={{marginTop:'15px',marginBottom:'150px', backgroundColor: 'rgba(6, 21, 117)', color:"#ffffff", fontWeight:'bold'}} onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
             &nbsp;Save
          </button>
          </Col>
          <Col> 
          <button className="btn" type="submit" style={{marginTop:'15px',marginBottom:'150px', marginLeft:'-70px', backgroundColor: 'rgba(6, 21, 117)', color:"#ffffff", fontWeight:'bold'}} ><a href='/MaterialList' style={{textDecoration:'none',color:'white'}}> 
          <i className="far fa-check-square"></i>
            
             &nbsp;Cancel
             </a>
          </button>
          </Col>
          </Row>
           
        </form>

      </div>
      </div>
      </div>

      </Row>
       
       
      </>
    )
  }
}
