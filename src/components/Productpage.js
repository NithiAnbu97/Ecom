
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { DataState } from '../context/Provider';
import Footer from './Footer';

const Productpage = () => {

    const navigate = useNavigate();
    const {filter,setFilter,Product,setcatName,catName,setSelectedProduct,setQuantity}=DataState();

    function clickHandeling(pro){
      setSelectedProduct(pro);
      setQuantity('1')
      navigate('/selected')
  
    }
    
    function catagoryFuction(e){
      
      let updateCatagory =  Product.filter((x)=>x.category === e);
      setFilter(updateCatagory)
      setcatName(e)
    }  

    function sortFunction(e){
      if(e==="low"){
        let updateCatagory =  Product.sort((a,b)=>a.offprice-b.offprice).filter(e=>e.instock===true)
        // let updateCatagory =  Product.filter((x)=>x.offertype === e);
        setcatName("All Products")
        setFilter(updateCatagory)
        console.log(updateCatagory);
      }else if(e==="high"){
        let updateCatagory =  Product.sort((a,b)=>b.offprice-a.offprice).filter(e=>e.instock===true)
        // let updateCatagory =  Product.filter((x)=>x.offertype === e);
        setcatName("All Products")
        setFilter(updateCatagory)
      }
     
    }

    function brandFunction(e){
      if(e==="Brand"){

      }else{
        let updateCatagory =  Product.filter((x)=>x.brand === e);
        setFilter(updateCatagory)
        setcatName(e)
      }
     
    }

  

  return <>
  <div>
     <div className='catagory-nav' >
        <ul style={{justifyContent:"center"}}>
          <li onClick={()=>{
            setFilter(Product)
            setcatName("All Products")
          }}>All Products</li>
          <li onClick={()=>catagoryFuction("Men")}>MEN</li>
          <li onClick={()=>catagoryFuction("Women")}>WOMEN</li>
          <li onClick={()=>catagoryFuction("Kids")}>KIDS</li>
          
        </ul> 
      </div>
    <div className='top-seller'>
           <div className='sort'>
             <h1><NavLink to="/home" style={{color:"gray", fontSize:"30px"}} href="/home"><i class="fa-solid fa-angle-left"></i> &nbsp;</NavLink>{catName} <span style={{color:"gray", fontSize:"30px"}}>({filter.length})</span></h1>
             <div style={{display:"flex",gap:"13px"}}>
             <select onChange={(e)=>brandFunction(e.target.value)}>
              <option>Brand</option> 
              <option value="Nike">Nike</option>
              <option value="Campus">Campus</option>
              <option value="adidas">adidas</option>

            </select>
            <select onChange={(e)=>sortFunction(e.target.value)}>
              <option>Sort By</option>
              <option value="low">Low-High</option>
              <option value="high">High-Low</option>

            </select>
             </div>
           </div>
            
            <div className='top-product'>
              {
                 filter.map((pro)=>{
                  return <div key={pro._id} className="product-box" onClick={()=>clickHandeling(pro)}>
                    <img className='pro-img' src={pro.img} alt={pro.title}/>
                    <p>{pro.brand}</p>
                    <h1>{pro.title}</h1>
                    <span>{pro.category}'s Shoe</span>
                    <div style={{display:"flex",gap:"20px",padding:"10px"}}>
                      <p>Rs.{parseInt(pro.offprice).toLocaleString()}</p>
                      <span>Rs.{parseInt(pro.price).toLocaleString()}</span>
                    </div>
                  </div>
                })
              }
            </div>
          </div>
          <Footer/>
  </div>
  </>
}

export default Productpage