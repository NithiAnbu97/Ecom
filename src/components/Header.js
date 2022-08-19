import { Avatar, Box, Button, Menu, MenuButton, MenuItem, MenuList, Tooltip, useToast } from '@chakra-ui/react'
import React, { useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons'
import { DataState } from '../context/Provider';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const {user,setUser,setToken,cartIteam,setFilter,Product,setcatName}=DataState();
  const toast = useToast();
  const navigate = useNavigate();
  const [profileview,setProfileview] = useState(false)

  function catagoryFuction(e){
    let updateCatagory =  Product.filter((x)=>x.category === e);
    setFilter(updateCatagory)
    setcatName(e)
    navigate('/product')
  }

  function profile(){
    setProfileview(true);

  }

  function logout(){
    localStorage.removeItem('Customer');
    localStorage.removeItem('auth');
    setUser('');
    setToken('');
    
    navigate('/')
    toast({
      title:" Please Login ",
      status:"warning",
      duration:3000,
      isClosable:true,
      position:"top"
  });
  }
  return <>
  <Box className='head-card'
  d="flex"
  justifyContent="space-between"
  alignItems="center"
  w="90%"
  margin="auto"
  p={{base:"10px 10px 10px 10px",md:"9px 10px 9px 10px"}}
  bg="#fff"
  >
  <div style={{display:"flex"}}>
    <NavLink to="/home">
  <h1 class="navbar-brand fs-2 text-danger">STYLES <span className='text-dark'>WEAR</span></h1>
  </NavLink>
     <div className='catagory-nav'>
        <ul>
          <li onClick={()=>{
            setFilter(Product)
            navigate('/product')
            setcatName("All Products")
          }}>All Products</li>
          <li onClick={()=>catagoryFuction("Men")}>MEN</li>
          <li onClick={()=>catagoryFuction("Women")}>WOMEN</li>
          <li onClick={()=>catagoryFuction("Kids")}>KIDS</li>
          
        </ul> 
      </div>
  </div>

     
   <div style={{display:"flex"}}>
     <Tooltip hasArrow label='Check out bag' bg='#e3e0e0' color='black'>
       <Link to="/cart">
           <div className='bag' >
           
           <i style={{fontSize:"21px",padding:"5px"}} class="fa-solid fa-bag-shopping"></i>
          
          <span style={{paddingBottom:"10px"}} className="notification">{cartIteam.length}</span>
            </div>
            </Link>
            </Tooltip>

              <Menu>
                 <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                    <Avatar size="sm"
                     cursor="pointer"
                      src={user?user.message.pic:""}
                      />  
                 </MenuButton>
                 <MenuList>
                   <MenuItem onClick={()=>profile()}> My Profile</MenuItem>
                   <MenuItem onClick={()=>navigate('/order')}>My Orders</MenuItem>
                   {
                     user.message.isAdmin?<MenuItem onClick={()=>navigate('/admin')}>Admin</MenuItem>:""
                   }
                    <MenuItem onClick={()=>logout()}>LogOut</MenuItem>
                 
                 {
                   
                 }
                 </MenuList>
                 </Menu>
    </div>
  </Box>
  <hr></hr>
  <div className={profileview?'profile':"disable"}>
    <div style={{display:"flex",justifyContent:"space-between",width:"90%",margin:"auto",padding:"10px"}}>
    <h2 className='fs-4'>Profile</h2>
    <button onClick={()=>setProfileview(false)}><i class="fa-solid fa-x"></i></button>
    
    </div>
    <hr></hr>
        <div className='profile-body'>
        <img src={user.message.pic} alt="profile"/>
        <h3 className='p-2 fw-bold fs-5'>{user.message.name}</h3>
        <span>{user.message.email}</span>
        </div>
        
  </div>
  </>
}

export default Header