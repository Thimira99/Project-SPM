import React, { Component, useState, useEffect } from 'react'
import axios from 'axios';
import ProductManagerDashboard from '../../../../components/ProductManagerDashboard/ProductManagerDashboard';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import AccountCSS from './account.module.css';
import { BsRecord2Fill } from "react-icons/bs";
//import uuid v4
import { v4 as uuid } from 'uuid';


function CreateOrder () {
  const [materialItem,setMaterialItem] = useState([ {materialItem:""}]);
  const [orderCode, setOrderCode] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [supplierId,setSupplierId]=useState('');
  const [supplierEmail,setSupplierEmail]=useState('');
  const [weight,setWeight]=useState('');
  const [contactPerson,setContactPerson]=useState('');
  const unique_id = uuid();
  const small_id = unique_id.slice(0,4)
  const [supplierGrp,setSupplierGrp]=useState('');
  const [materialId,setMaterialId] = useState([]);

   
  //const [pidError, SetPidError] = useState(false);

const handleMaterialAdd = () =>{
  setMaterialItem([...materialItem,{materialItem:""}])
  console.log("message 1",materialItem)
}

const handleMaterialRemove = (index)=>{
  const array = [...materialItem];
  array.splice(index,1);
  setMaterialItem(array);
};

const handleMaterialChange = (e,index)=>{
  const {name,value} = e.target
  const array = [...materialItem];
  array[index][name] = value;
  setMaterialItem(array);

  console.log("name",name)
}

useEffect(() => {
  function getSuppliers() {
    axios
      .get("http://localhost:8000/supplier/get")
      .then((res) => {
        setSupplierGrp(res.data.existingSuppliers)
         
      })
      .catch((err) => {
        alert(err.message);
      });

     
  }
  function getMaterials() {
    axios
      .get("http://localhost:8000/material/get")
      .then((res) => {
        setMaterialId(res.data.existingMaterials)
         
      })
      .catch((err) => {
        alert(err.message);
      });

     
  }
  getSuppliers();
  getMaterials();
}, []);

function checkLength(){
  
    const long = [...materialItem];
    if(long.length<4){
      window.confirm("There should be 4 members to a panel");
      submitBtn.setDisable(true)
    }
      orderCode+small_id;
      
      const newOrder= {
        orderCode,
        orderDate,
        supplierId,
        supplierEmail,
        contactPerson,
        materialItem,
        weight,
        
      }
      console.log("memberrrrname",materialId)
      axios.post("http://localhost:8000/order/post", newOrder).then(() => {
          
          alert("Order created successfully");
          //window.location.href='/viewPanels';
      }).catch((err) => {
          alert("Unable to add" + err);
      })
    
    }

     
  return(
    <>
    <ProductManagerDashboard/>


    <Row>
  <div className='container'>
  <div className = 'card' style={{marginLeft:'220px', marginTop:'20px', background: "#D3D3D3",height:'auto',width:'600px',marginRight:'100px'}}>
  <div className='col-md-8 mt-4 mx-auto'>
  
  

    <h3   style={{color: 'rgba(6, 21, 117)', fontWeight:'bold'}}> CREATE ORDER </h3>
    <button className="btn btn-primary" style={{"width": "360px", "fontWeight": "600"}}>
    <a href="/productList" style={{textDecoration:'none',color:'white', fontWeight:'bold',}}>
      VIEW PAST ORDERS
    </a></button><br/> 
    <form className='needs-validation' noValidate autoComplete='off' onSubmit={checkLength} > <br/>
    <div className='form-group' style={{marginBottom:'15px'}}>
        <label style={{marginBottom:'5px'}}>ORDER CODE</label>
        <input 
          type="text"
          onChange={(e) => {
            setOrderCode(e.target.value+(small_id));
          }}
          className="form-control"
           
          required
        />
        
      </div>
      <br/>

      <div className='form-group' style={{marginBottom:'15px'}}>
        <label style={{marginBottom:'5px'}}>ORDER DATE</label>
        <input 
          type="datetime-local"
          onChange={(e) => {
            setOrderDate(e.target.value+(small_id));
          }}
          className="form-control"
           
          required
        />
        
      </div>
      <br/>
      <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>MATERIAL</label>
       
          {materialItem.map((singleMaterial,index)=>(
            <div key={index} >
                <div>
               
                  <select id="materialItem"  name="materialItem" onChange={(e)=>handleMaterialChange(e,index)} value={singleMaterial.materialItem}
                    className="btn btn-secondary dropdown-toggle" style={{backgroundColor:'rgba(143, 145, 148 ,1)'}}>
                    <option selected> Choose...</option>
                    {materialId.map(obj=>
                      <option>{obj.materialId}</option>
                    )}
                
            </select>
                 
                  {materialItem.length-1===index && materialItem.length<4 && (
                    <button onClick={handleMaterialAdd}
                      style={{marginLeft:'50px',marginTop:'-5px'}}
                      className="btn btn-secondary">
                      <span>+</span>
                    </button>
                  )}
                </div>
               
                <div>
                {materialItem.length>1 && (
                  <button onClick={()=>handleMaterialRemove(index)}
                      className="btn btn-danger"
                      style={{padding:'10px',marginTop:'20px',marginBottom:'20px'}}
                  >
                    <span>Remove</span>
                  </button>
                  )}
                </div>
                
            </div>
            
          ))}
         
      </div>
        
      <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>SUPPLIER</label>

            <select id="supplierId" onChange={(e) =>{setSupplierId(e.target.value)}}
              className="btn btn-secondary dropdown-toggle" style={{backgroundColor:'rgba(143, 145, 148 ,1)'}}>
              <option selected> Choose...</option>
              {supplierGrp  && supplierGrp.map(obj=>
                <option>{obj.supplierId}</option>
              
              )}
                
            </select>
        
      </div>

      <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>SUPPLIER EMAIL</label>
            <input 
          type="text"
          onChange={(e) => {
            setSupplierEmail(e.target.value+(small_id));
          }}
          className="form-control"
          style={{width:'300px'}}
          required
        />
        
      </div>

      <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>CONTACT PERSON</label>

            <select id="contactPerson" onChange={(e) =>{setContactPerson(e.target.value)}}
              className="btn btn-secondary dropdown-toggle" style={{backgroundColor:'rgba(143, 145, 148 ,1)'}}>
              <option selected> Choose...</option>
              {supplierGrp  && supplierGrp.map(obj=>
                <option>{obj.contactPerson}</option>
              
              )}
                
            </select>
        
      </div>


      <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>WEIGHT</label>
            <input 
          type="text"
          onChange={(e) => {
            setWeight(e.target.value+(small_id));
          }}
          className="form-control"
          style={{width:'300px'}}
          required
        />
        
      </div>
        <br/>

        <Row>
          <Col> 
          <button className='btn' id="submitBtn"  type="submit" style={{marginTop:'15px',marginBottom:'150px', backgroundColor: 'rgba(6, 21, 117)', color:"#ffffff", fontWeight:'bold'}} >
            <i className="far fa-check-square"></i>
             &nbsp;Create 
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
      
      {/* <Button variant="success" type="submit" id="submitBtn" className='submitBtnForm'>
                    Create Order
      </Button>
      */}
     
    </form>
    </div>
    <br/>
    
    </div>
    <br/>
 
    </div>
    </Row>
       
       
       </>
  )

}

export default CreateOrder