import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, {  useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant';
import { DataState } from '../context/Provider';

const Cart = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const {setcartIteam,cartIteam,setbuyProduct,setQuantity,buyProduct,quantity,user
    }=DataState();
    const [pop,setPop]=useState(false);
    const [address,setAddress] = useState();
    const [price,setPrice] = useState();
    
   
  const confirmFunction = async()=>{
    if(!address){
      toast({
        title:"Add address",
        status:"warning",
        duration:3000,
        isClosable:true,
        position:"top"
    });
    }else{
     let brand=buyProduct.brand
     let category=buyProduct.category
     let color=buyProduct.color
     let offprice=buyProduct.offprice
     let title=buyProduct.title
     let sizes=buyProduct.sizes
     let image =buyProduct.img;
     let quan=quantity
     let addres =address
     let users=user.message.email
     let name=user.message.name
     let total=price;
    
     
    
      
       try {
        const config = {
          headers :{
           "Content-type":"application/json",
          }
        }
        const {data}= await axios.post(`${BASE_URL}Orders`,
        {addres,brand,category,color,image,
          name,offprice,quan,sizes,title,total,users},config);
        if(data){
          toast({
            title:"Order Placed Succefully",
            status:"success",
            duration:3000,
            isClosable:true,
            position:"top"
           });
        }
        navigate('/home');
        cartIteam.splice(cartIteam.indexOf(buyProduct),1);
        setcartIteam(cartIteam)
         localStorage.setItem('cart',JSON.stringify(cartIteam));
         let d = cartIteam.filter((e)=>e.instock===true);
         setcartIteam(d)
       } catch (error) {
        toast({
          title:"Order Placed Succefully",
          status:"success",
          duration:3000,
          isClosable:true,
          position:"top"
         });
       }
    }
    
  }

    function removeItem(delItem){
     cartIteam.splice(cartIteam.indexOf(delItem),1);
     setcartIteam(cartIteam)
      localStorage.setItem('cart',JSON.stringify(cartIteam));
      let data = cartIteam.filter((e)=>e.instock===true);
      setcartIteam(data)
      toast({
          title:"Product removed from Bag",
          status:"success",
          duration:3000,
          isClosable:true,
          position:"top"
      });

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
           <h3 style={{fontSize:"18px"}}>Bag</h3>
           <i style={{fontSize:"21px",padding:"5px"}} class="fa-solid fa-bag-shopping"></i>
          
          <span style={{paddingBottom:"10px"}} className="notification">{cartIteam?cartIteam.length:""}</span>
            </div>
    </div>
    <hr></hr>
    <div className='cart-main'>
      {
        cartIteam?cartIteam.map((e)=>{
          return <div className='row py-4 d-flex justify-content-center' key={e._id} >
         
         <div className='col-md-4'>
        <img src={e.img} alt={e.title} height="200px"
        width="200px" className='pt-5' />
        <div className='quantity'>
       <h2>Quantity :</h2>
       <select onChange={(e)=>setQuantity(e.target.value)}>
             <option value="1" selected>1</option> 
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>

           </select>
       <h2 style={{paddingLeft:"50px"}}>Colour : {e.color}</h2>
     </div>
        
      </div>
      
      <div className='col-md-5'>
        <h4 className='text-uppercase text-black-40 pt-5'>
          {e.category}
        </h4>
        <h1 style={{fontSize:"30px",fontWeight:"200"}}>{e.title}</h1>
        <div className='d-flex align-items-center pt-4'>
        <p className=' '>
          Rating {e.ratings}
          <i className='fa fa-star'></i>
        </p>
        <p style={{paddingLeft:"20px",textAlign:"center"}}>Warranty : {e.warranty}</p>
        </div>
        
        <div style={{display:"flex",gap:"20px",padding:"10px",alignItems:"center",}}>
           <p className='fw-bold my-4 fs-4'>Rs.{parseInt(e.offprice).toLocaleString()}</p>
           <p>Size : {e.sizes}</p>
         </div>
        
   
         <button onClick={()=>removeItem(e)} className='btn btn-outline-danger px-4 py-2'>Remove Item</button>
         <button onClick={()=>{
                setbuyProduct(e)
                setPop(true)
                setPrice(buyProduct.offprice*quantity+50)
         }} className="btn btn-danger ms-2 px-3 py-2"> Buy now</button>
      </div>
          </div>
        }) :"loading..."
      }
    </div>
   
  </div>
  {/* ===========popup==================== */}
   <div className={pop?"pop-main":"disable"}>
     <div className='pop-head'>
       <h1 className='fs-3 text-danger'>Order Summery</h1>
       <button onClick={()=>setPop(false)}><i class="fa-solid fa-x"></i></button>
     </div>
      <hr></hr>
      {
        buyProduct? <div className='pop-body row'>
        <div className='col-md-8'>
           <div className='address'>
             <label className='fs-5'>Address</label>
             <textarea onChange={(e)=>setAddress(e.target.value)} placeholder='Enter your Address' cols={50} rows={3}></textarea>
           </div>
           <div className='d-flex align-item-center'>
             <div><h2 className='fw-bold pt-3'>Payment Method</h2>
              <p>Pay on Delivery(cash/card)</p></div>
              <p style={{paddingLeft:"50px"}} className='pt-3 fs-5'>Estimated delivery : Tomorrow </p>
           </div>
           
 
           <div className='row'>
               <div className='col-md-4'>
               <img src={buyProduct.img} alt={buyProduct.title} height="100px"
                  width="100px" className='pt-5' />
               </div>
               <div className='col-md-8'>
               <h4 className='text-uppercase text-black-40 pt-5'>
           {buyProduct.category}
         </h4>
         <h1 style={{fontSize:"27px",fontWeight:"200"}}>{buyProduct.title}</h1>
         <div className='d-flex align-items-center pt-2'>
         <p className='fw-bold'>
           Rating {buyProduct.ratings}
           <i className='fa fa-star'></i>
         </p>
         <p style={{paddingLeft:"20px",textAlign:"center"}}>Warranty : {buyProduct.warranty}</p>
         </div>
         
         <div style={{display:"flex",gap:"20px",alignItems:"center",}}>
            <p className='fw-bold my-4 fs-4 text-danger'>Rs.{parseInt(buyProduct.offprice).toLocaleString()}</p>
            <p>Size : {buyProduct.sizes}</p>
            <p>Quantity : {quantity}</p>
          </div>
         
               </div>
           </div>
        </div>
        <div className='col-md-3 pay-detail'>
          <div>
          <h2 className='text-danger fs-5 fw-bold'>Payment Summery</h2>
          <br></br>
          <table>
            <tr>
              <td>Item:</td>
              <td style={{paddingLeft:"80px"}}>Rs.{parseInt(buyProduct.offprice).toLocaleString()}</td>
            </tr>
            <tr>
              <td>Quantity:</td>
              <td style={{paddingLeft:"80px"}}>{quantity}</td>
            </tr>
            <tr>
              <td>Delivery:</td>
              <td style={{paddingLeft:"80px"}}>Rs.50</td>
            </tr>
          </table>
          <br></br>
          <hr></hr>
          <div className='d-flex justify-content-between pt-2 pb-2 fw-bold'>
            <h2>Order Total:</h2>
            <h3>Rs.{buyProduct.offprice*quantity+50}</h3>
          </div>
          <hr></hr>
          <br></br>
          <button onClick={()=>confirmFunction()} className='btn btn-danger col-12'>Confirm order</button>
          </div>
        </div>
      
       </div> :"Loading..."
      }
     
     
   </div>
  </>
}

export default Cart