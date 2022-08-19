import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import { BASE_URL } from '../constant';

const Create = () => {

    const toast = useToast();
    const[title,setTitle] = useState();
    const[des,setDes] = useState();
    const[img,setImg] = useState();
    const[category,setCategory] = useState();
    const[price,setPrice] = useState();
    const[offprice,setOffprice] = useState();
    const[offertype,setOffertype] = useState();
    const[ratings,setRatings] = useState();
    const[warranty,setWarranty] = useState();
    const[brand,setBrand] = useState();
    const[color,setColor] = useState();
    const[arrival,setArrival] = useState();

 async   function saveHandel(){
      try {
          let config = {
              headers:{"Content-type":"application/json",}
          }
          let {data} = await axios.post(`${BASE_URL}createproduct`,{
              title,
              des,
              img,category,price,offprice,offertype,
              ratings,warranty,brand,color,arrival
          },config)
          if(data){
            toast({
                title:"Product Created Successfully",
                status:"success",
                duration:3000,
                isClosable:true,
                position:"top"
            });
          }
      } catch (error) {
          alert(error.response.data)
      }
    }
  return <div> 
     <Header/>
      <div className="mt-2 container">
          <div>
          <h1 style={{fontSize:"25px"}}>
          <NavLink to="/admin" style={{color:"gray", fontSize:"30px"}} href="/home"><i class="fa-solid fa-angle-left"></i> &nbsp;</NavLink>
              Add Products</h1>
          
          </div>  
            <br></br>
            <div className='row d-flex justify-content-center'>
                <div className='col-6'>
                <div className="form-group pb-2">
                    <label >Product Title</label>
                    <input type="text" className="form-control"  
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder="Enter Product title"/>
                   
                </div>
                <div className="form-group pb-2">
                    <label>Description</label>
                    <input type="text" className="form-control" onChange={(e)=>setDes(e.target.value)} placeholder="Product Description"/>
                </div>
                <div className="form-group pb-2">
                    <label>Product Image</label>
                    <input type="text" className="form-control" onChange={(e)=>setImg(e.target.value)} placeholder="Product Image"/>
                </div>
                <div className="form-group pb-2">
                    <label>Product Category</label>
                    <input type="text" className="form-control" onChange={(e)=>setCategory(e.target.value)} placeholder="Product Category"/>
                </div> 
                <div className="form-group pb-2">
                    <label>Price</label>
                    <input type="text" className="form-control" onChange={(e)=>setPrice(e.target.value)} placeholder="price"/>
                </div>
                <div className="form-group pb-2">
                    <label>Offer price</label>
                    <input type="text" className="form-control" onChange={(e)=>setOffprice(e.target.value)} placeholder="Offer price"/>
                </div>
                </div>
                <div className='col-6'>
                <div className="form-group pb-2">
                    <label>Offer type</label>
                    <input type="text" className="form-control" onChange={(e)=>setOffertype(e.target.value)} placeholder="Offer Type"/>
                </div>
                <div className="form-group pb-2">
                    <label>Ratings</label>
                    <input type="text" className="form-control" onChange={(e)=>setRatings(e.target.value)} placeholder="Rattings"/>
                </div>
                <div className="form-group pb-2">
                    <label>Warranty</label>
                    <input type="text" className="form-control" onChange={(e)=>setWarranty(e.target.value)} placeholder="Rattings"/>
                </div>
                <div className="form-group pb-2">
                    <label>Brand</label>
                    <input type="text" className="form-control" onChange={(e)=>setBrand(e.target.value)} placeholder="Brand"/>
                </div>
                <div className="form-group pb-2">
                    <label>Product color</label>
                    <input type="text" className="form-control" onChange={(e)=>setColor(e.target.value)} placeholder="Product Color"/>
                </div>
                <div className="form-group pb-2">
                    <label>Product Arrivals</label>
                    <input type="text" className="form-control" onChange={(e)=>setArrival(e.target.value)} placeholder="Product Arrival"/>
                </div>
                </div>


               
                <button type="submit" className="btn btn-primary col-4 mt-4" onClick={saveHandel}>Submit</button>
             
            </div>
        </div>
  </div>
}

export default Create


  