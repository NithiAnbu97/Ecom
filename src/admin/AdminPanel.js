import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { BASE_URL } from '../constant';
;

const AdminPanel = () => {
  const toast =useToast();
    const [Orders,setOrders]=useState([]);

    useEffect(()=>{
        getOrder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
    const getOrder = async()=>{     
      try {
         
        let respon = await axios.get(`${BASE_URL}getorders`)
          let data = await respon.data.message;
          setOrders(data)
         
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

    const deleteItem = async(id)=>{
      try {
        await axios.delete(`${BASE_URL}delorders/`+id)
        getOrder();
      } catch (error) {
        
      }
    }


  return <>
  <Header/>
  <div className='container'>
    <div className='cart-main'>
      <div style={{display:"flex",justifyContent:"space-between"}}>
     <h1 className='fs-3 p-3 text-danger'>Orders Placed</h1>
     <div style={{alignItems:"center"}}> 
     <NavLink to="/create">
     <button className='btn btn-danger mt-4' >Create Product</button>
     </NavLink></div>
    
      </div>
       

        <div className='oreded-product'>
        {
        Orders.length?Orders.map((e)=>{
          return <div className='order-card'>
            <div>
            <h1 className='fs-5 pt-4'>Delivery to : <span className='fs-5 text-uppercase p-1'>{e.name}</span></h1>
            
            <p className='fs-5 pb-3'>Address : {e.addres}</p>
            </div>

            <div className='side-1'>
             <div className='col-1'>
              <img src={e.image} alt={e.title} height="100px"
                width="100px" className='pt-2' />
              </div>

              <div className='col-2'>
                  <h4 className='text-uppercase text-black-30 pt-2'>
              {e.category}
            </h4>
                    <h1 style={{fontSize:"20px",fontWeight:"400"}}>{e.title}</h1>
                    <p className='text-danger fw-blod fs-5'>Delivery(Tomorrow)</p>
                    <div style={{display:"flex",gap:"20px",alignItems:"center",}}>
                    <p className='my-1 fs-5 '>Total : Rs.{e.total}</p>
                    <p>Size : {e.sizes}</p>
                    <p>Quantity : {e.quan}</p>
                  </div>
                  <div>
                  <button onClick={()=>deleteItem(e._id)} className='btn btn-danger'>Order Delivered</button>
                            </div>
                  
                  </div>
            </div>
            
        
          
      </div>
        }) :<div style={{height:"200px"}}>
           No order Placed
        </div>
      }

        </div>
      
    </div>
   
  </div>
  <Footer/>
  </>

}

export default AdminPanel