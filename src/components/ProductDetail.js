import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant';
import { DataState } from '../context/Provider';
import Footer from './Footer';
import Header from './Header';

const ProductDetail = () => {
    const {selectedProduct,filter,setSelectedProduct
      ,setcartIteam,cartIteam,size,setSize,setbuyProduct,
      buyProduct,quantity,setQuantity,user} = DataState();
      const [pop,setPop]=useState(false);
      const [address,setAddress] = useState();
      const [price,setPrice] = useState();
    const navigate = useNavigate();
    const toast = useToast();
    
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
        let sizes = size;
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




    function clickHandeling(pro){
      setSelectedProduct(pro);
      setQuantity("1")
      navigate('/selected')
  
    }
    function sizeFunction(size){
      setSize(size);
      
    }
    function buyNow(e){
      if(!size){
        toast({
          title:"Please select Size",
          status:"warning",
          duration:3000,
          isClosable:true,
          position:"top"
      });
      }else{
        setbuyProduct(e)
         setPop(true)
         let calc = parseInt(buyProduct.offprice) *parseInt(quantity) +50;
         
         setPrice(calc);
      }
    }
    function addCart(item){
     
      if(size){
        let data = {
          brand:item.brand,
          instock:true,
          category:item.category,
          color:item.color,
          offprice:item.price,
          title:item.title,
          warranty:item.warranty,
          sizes:size,
          ratings:item.ratings,
          img:item.img,
          _id:item._id,
           total:buyProduct.offprice*quantity+50
         }
        cartIteam.push(data)
        localStorage.setItem('cart',JSON.stringify(cartIteam));
        const c = JSON.parse(localStorage.getItem("cart"));
        setcartIteam(c)
       
        toast({
          title:"Product Added to Bag",
          status:"success",
          duration:3000,
          isClosable:true,
          position:"top"
      });
      }else{
        toast({
          title:"Please select shoe size",
          status:"warning",
          duration:3000,
          isClosable:true,
          position:"top"
      });
      }
     }


    
   
    
  return <>
   <div>
     <div className='container'>
       <div className='row py-4'>
       <Header/>
      
      <div className='col-md-6'>
     <img src={selectedProduct.img} alt={selectedProduct.title} height="400px"
     width="400px" className='pt-5' />
     
    <div className='size'>
       <h2>Size :</h2>
       <select onChange={(e)=>sizeFunction(e.target.value)}>
             <option selected>select size</option> 
             <option value="8">8</option>
             <option value="9">9</option>
             <option value="10">10</option>

           </select>
       <h2 style={{paddingLeft:"50px"}}>Colour : {selectedProduct.color}</h2>
     </div>
   </div>
   
   <div className='col-md-6'>
     <h4 className='text-uppercase text-black-50 pt-5'>
       {selectedProduct.category}
     </h4>
     <h1 className='display-5'>{selectedProduct.title}</h1>
     <div style={{display:"flex",paddingTop:"20px",gap:"30px"}}>
        <p className='lead fw-bolder'>
          Rating {selectedProduct.ratings}
          <i className='fa fa-star'></i>
        </p>
        <h2>Quantity : 
       <select style={{outline:"none",paddingTop:"4px"}} onChange={(e)=>setQuantity(e.target.value)}>
             <option value="1" selected>1</option> 
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>

           </select></h2>

     </div>
    
     <div style={{display:"flex",gap:"20px",padding:"10px",alignItems:"center",}}>
        <p className='display-6 fw-bold my-4'>Rs.{parseInt(selectedProduct.offprice).toLocaleString()}</p>
        <span className='text-danger' style={{textDecoration:"line-through"}}>Rs.{parseInt(selectedProduct.price).toLocaleString()}</span>
      </div>
     
      <p className='lead pb-5'>{selectedProduct.des}</p>

      <button onClick={()=>addCart(selectedProduct)} className='btn btn-outline-danger px-4 py-2'>Add to Bag</button>
      <button onClick={()=>{buyNow(selectedProduct)}} className="btn btn-danger ms-2 px-3 py-2"> Buy now</button>
   </div>
       </div>
       {
         filter.length?<div style={{marginBottom:"60px"}}>
         <h1 style={{color:"gray", fontSize:"40px",padding:"50px 10px 50px 10px",}}>Related Products</h1>
           <div className='top-product'>
         {
           filter.filter((e)=>selectedProduct._id !==e._id).slice(0, 6).map((pro)=>{
            return <div key={pro._id} className="product-box" onClick={()=>clickHandeling(pro)}>
              <img className='pro-img' src={pro.img} alt={pro.title}/>
              <p>{pro.brand}</p>
              <h1>{pro.title}</h1>
              <span>{pro.category}'s Shoe</span>
              <div style={{display:"flex",gap:"20px",padding:"10px",}}>
                <p>Rs.{parseInt(pro.offprice).toLocaleString()}</p>
                <span>Rs.{parseInt(pro.price).toLocaleString()}</span>
              </div>
            </div>
          })
         }
        </div>
         </div>:""
       }
       
     </div>
     <Footer/>
   </div>
     {/* ===========popup==================== */}
     <div className={pop?"pop-main1":"disable"}>
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
            <p>Size : {size}</p>
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
            {/* parseInt(price).toLocaleString() */}
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

export default ProductDetail