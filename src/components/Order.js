import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { BASE_URL } from '../constant';
import { DataState } from '../context/Provider';

const Order = () => {
    const toast = useToast();
    const {user}=DataState();
    const [Orders,setOrders]=useState([]);

    useEffect(()=>{
        getOrder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
    const getOrder = async()=>{     
      try {
          
        let respon = await axios.get(`${BASE_URL}getorders`)
          let data = await respon.data.message;
          let order = await data.filter((e)=>e.users===user.message.email)
          console.log(order);
          setOrders(order)
          
          
      } catch (error) {
        
        console.log(error.response.data);
        toast({
          title:error.response.data,
          status:"error",
          duration:3000,
          isClosable:true,
          position:"top"
         });
      }
    }



  return <>
  <div className='container'>
    <div style={{display:"flex",justifyContent:"space-between",padding:"20px 0px"}}>
      <NavLink to="/home">
      <div style={{display:"flex",alignItems:"center"}} className="text-danger">
      <i style={{fontSize:"21px",padding:"5px"}} class="fa-solid fa-arrow-left"></i>
      <h2 style={{paddingLeft:"10px"}}>Keep Shopping</h2>
      </div>
      </NavLink>
      <div className='bag' style={{alignItems:"center"}} >
      
           <i style={{fontSize:"21px",padding:"5px"}} class="fa-solid fa-basket-shopping"></i>
          
          <span style={{paddingBottom:"10px"}} className="notification">{Orders.length}</span>
            </div>
    </div>
    <hr></hr>
    <div className='cart-main'>
        <h1 className='fs-3 p-3'>Your Orders</h1>
      {
        Orders?Orders.map((e)=>{
          return <div className='row'>
          <div className='col-md-4'>
          <img src={e.image} alt={e.title} height="100px"
             width="100px" className='pt-5' />
          </div>
          <div className='col-md-8'>
          <h4 className='text-uppercase text-black-40 pt-5'>
      {e.category}
    </h4>
            <h1 style={{fontSize:"27px",fontWeight:"200"}}>{e.title}</h1>
            <p className='text-danger fw-blod fs-5'>Arrivaling in Tomorrow</p>
            <div style={{display:"flex",gap:"20px",alignItems:"center",}}>
            <p className='my-4 fs-4 '>Total : Rs.{e.total}</p>
            <p>Size : {e.sizes}</p>
            <p>Quantity : {e.quan}</p>
          </div>
          </div>
      </div>
        }) :"loading..."
      }
    </div>
   
  </div>
  </>
}

export default Order