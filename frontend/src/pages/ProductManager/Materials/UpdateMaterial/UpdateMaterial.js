import React, { Component } from 'react'
import axios from 'axios';
import ProductManagerDashboard from '../../../../components/ProductManagerDashboard/ProductManagerDashboard';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import AccountCSS from './account.module.css';
import { BsRecord2Fill } from "react-icons/bs";

export default class UpdateMaterial extends Component {

  constructor(props){
    super(props);
    this.state={
        
        dateCreated:"",
        materialId:"",
        supplier:"",
        cost:"", 
        weight:"",   
        status:"",  
        suppliers:[],  
       
    }
  }
    handleInputChange=(e)=>{
      const {name,value} = e.target;

      this.setState({
          ...this.state,
          [name]:value
      })
  }
   
  handleInputSelect=(e)=>{
    this.setState({supplier:e.target.value})
    console.log("supplier",e.target.value)
}

  onSubmit=(e)=>{
    e.preventDefault();

    /** */
    const id = this.props.match.params.id;
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

    axios.put(`http://localhost:8000/material/update/${id}`,data).then((res)=>{
      if(res.data.success){
        alert("Material details updated Successfully!");
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

componentDidMount(){
  const id=this.props.match.params.id;

  axios.get(`http://localhost:8000/material/get/${id}`).then((res) =>{
      if(res.data.success){
          this.setState({
            dateCreated:res.data.material.dateCreated,
            materialId:res.data.material.materialId,
            supplier:res.data.material.supplier,
            cost:res.data.material.cost,
            weight:res.data.material.weight,
            status:res.data.material.status
          });

          console.log(this.state.materialId);
      }
  });

  axios.get("http://localhost:8000/material/get").then((res)=>{
      if(res.data.success){
          this.setState({
              materials:res.data.existingMaterials
          })
      }
  })

  this.retrieveSuppliers(); 
}

 

retrieveSuppliers(){
  axios.get("http://localhost:8000/supplier/get").then(res=>{
        if(res.data.success){
            this.setState({
                suppliers:res.data.existingSuppliers
            });
            console.log(this.state.suppliers)
        }
    });
}

 
  render() {
     

    return (
        <>
        <ProductManagerDashboard/>


        <Row>
      <div className='container'>
      <div className = 'card' style={{marginLeft:'220px', marginTop:'20px', background: "#D3D3D3",height:'auto',width:'600px',marginRight:'100px'}}>
      <div className='col-md-8 mt-4 mx-auto'>
      
      

        <h3   style={{color: 'rgba(6, 21, 117)', fontWeight:'bold'}}> UPDATE MATERIAL </h3>
        <button className="btn btn-primary" style={{"width": "360px", "fontWeight": "600"}}>
        <a href="/materialList" style={{textDecoration:'none',color:'white', fontWeight:'bold',}}>
          VIEW MATERIALS 
        </a></button><br/> 
        <form className='needs-validation' noValidate >
         
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
             
          </div>


          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>SUPPLIER</label>
                   
                  <select id="supplier" value={this.state.supplierId} onChange={this.handleInputSelect}
                    className="btn dropdown-toggle" style={{backgroundColor: '#fff', marginLeft:'20px'}}>
                  <option selected>{this.state.supplier}</option>
                      {
                        this.state.suppliers.map((obj)=>(
                          <option>{obj.supplierId}</option>
                        ))
                      }
                 </select>
 

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
             
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>COST</label>
            <input 
              type="number"
              className="form-control"
              name="cost"
              placeholder="Enter Cost"
              value={this.state.cost}
              onChange={this.handleInputChange}
            />
            
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>STATUS</label>
                  <select id="status" value={this.state.status} onChange={e=> this.setState({status:e.target.value})} className="btn dropdown-toggle" style={{backgroundColor: '#fff', marginLeft:'20px'}}>
                    <option selected> Select</option>
                    <option>ACTIVE</option>
                    <option>INACTIVE</option>
                  </select>
          </div>


          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>DATE CREATED</label>
            <input 
              type="datetime-local"
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
             &nbsp;Update
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
