import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant';
import { Carousel } from 'react-bootstrap';
import { DataState } from '../context/Provider';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const {setUser,setToken,Product,setProduct,setcatName,setFilter,setSelectedProduct,setQuantity
  }=DataState();

  useEffect(()=>{
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function catagoryFuction(e){
    let updateCatagory =  Product.filter((x)=>x.category === e);
    setFilter(updateCatagory)
    setcatName(e)
    navigate('/product')
  }

  function clickHandeling(pro){
    setSelectedProduct(pro);
    setQuantity("1")
    navigate('/selected')

  }

  let getData = async()=>{
    try {
      let respon = await axios.get(`${BASE_URL}getproducts`,{
        headers:{'auth':`${JSON.parse(localStorage.getItem('auth'))}`}
      })
      setProduct(respon.data.message)
    } catch (error) {
      console.log(error.response.data);
    localStorage.removeItem('Customer');
    localStorage.removeItem('auth');
    setUser('');
    setToken('');
    navigate('/')
    toast({
      title:"Token expired",
      status:"warning",
      duration:3000,
      isClosable:true,
      position:"top"
     });
    }
    
  }
  // function logout(){
  //   localStorage.removeItem('Customer');
  //   localStorage.removeItem('auth');
  //   setUser('');
  //   setToken('');
    
  //   navigate('/')
  //   toast({
  //     title:" Please Login ",
  //     status:"warning",
  //     duration:3000,
  //     isClosable:true,
  //     position:"top"
  // });
  // }
  return <>
    <div className='home-main'>
      <Header/>
         <Carousel>
            <Carousel.Item>
              <img style={{height:"350px"}}
                className="d-block w-100 h"
                src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/846beb79-ada7-48c3-a6c6-4448f276c2111651599573979-Sports-Shoes_Desk.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            
            <Carousel.Item>
              <img style={{height:"350px"}}
                className="d-block w-100"
                src="https://www.skechers.in/dw/image/v2/BGNZ_PRD/on/demandware.static/-/Sites-skechersin-Library/default/dw9b7af280/Category-Landing/Home-Page/Home-Page-Desktop/Desktop_INTL52561_SP2022_Banner_Refresh-U_Kids-IN-Trending-1920x610.jpg?sw=1920&sfrm=jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
          <br>
          </br>
          <div className='top-brands'>
            <h1>Top Brands</h1>
            <div className='brand-img'>
              <img src='https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg' alt='adidas'/>
              <img src='https://i.pinimg.com/originals/0e/7d/19/0e7d19a04dd482e56a436e69854943e2.jpg' alt='campus'/>
              <img src='https://play-lh.googleusercontent.com/eLqKK4MkDoXXbD_F3A_2rs-othxTESxbocvyOGyhAmbNCydgnYKczItIY2-HLYJmhr6Q' alt='nike'/>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1LDBDuyEJUP8SrA-i8kAme6D6lI-Nk_O-S8vHyCspNyh2Yh2xjlrakPDdbMuXiO_nuzQ&usqp=CAU' alt='puma'/>
            </div>
          </div>
          <div className='top-seller'>
            <h1>Top sellers</h1>
            <div className='top-product'>
              {
                Product? Product.filter((e)=>e.offertype==="Topseller").map((pro)=>{
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
                }):"Loading.."
              }
            </div>
          </div>
          <div className='gallary'>
            <div className='gallary-col' onClick={()=>catagoryFuction("Men")}>
              <img src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_411,c_limit/54238927-c5aa-46a3-abff-25162b3b1fd7/nike-just-do-it.png" alt="men"/>
              <div className='layer'>
              <h3>Men's</h3>
              </div>           
              
            </div>
            <div className='gallary-col' onClick={()=>catagoryFuction("Kids")}>
            <img src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_411,c_limit/aa8d60e4-d556-4022-9f83-9058601c20a4/nike-just-do-it.png" alt="kids"/>
              <div className='layer'>
              <h3>Kids</h3>
              </div>           
              
            </div>
            <div className='gallary-col' onClick={()=>catagoryFuction("Women")}>
            <img src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_411,c_limit/e64cc521-c652-49bd-bf62-f04cf9cb6b60/nike-just-do-it.png" alt="women"/>
              <div className='layer'>
              <h3>Women's</h3>
              </div>           
              
            </div>
           
          </div>
          <div className='top-seller'>
            <h1>New Arrivals</h1>
            <div className='top-product'>
              {
                Product? Product.filter((e)=>e.offertype==="Newest").map((pro)=>{
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
                }):"Loading.."
              }
            </div>
          </div>
          <Footer/>
    </div>
  </>
}

export default Home