import { Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant';

const Register = () => {

  let navigate = useNavigate()
  const [name,setName]=useState('');
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [re_pasword,setRe_password]=useState('')
  const [pic,setPic]=useState();
  const [loading,setLoading]=useState(false);
  const toast = useToast();
 

  const submitHandler = async()=>{
    setLoading(true)
    if(password!==re_pasword){
      setLoading(true)
      toast({
        title:"Password does not match",
        status:"warning",
        duration:3000,
        isClosable:true,
        position:"top"
    });
    }else{
      try {
        const config = {
          headers:{
            "Content-type":"application/json",
          }
        }
        await axios.post(`${BASE_URL}users/register`,{name,email,password,pic},config)
        toast({
          title:"Registered successfully",
          status:"success",
          duration:3000,
          isClosable:true,
          position:"top"
      });
      setLoading(false)
      navigate('/home')
      } catch (error) {
        setLoading(false)
        toast({
          title:error.response.data,
          status:"error",
          duration:3000,
          isClosable:true,
          position:"top"
      });
      }
    }
  }
  const postDetails = (pics)=>{
    setLoading(true);
    if(pics===undefined){
      setLoading(false);
      toast({
        title:"Please set the Image",
        status:"warning",
        duration:3000,
        isClosable:true,
        position:"top"
    });
  } if(pics.type==="image/jpeg"||pics.type==="image/png"){
    const data = new FormData();
    data.append("file",pics);
    data.append('upload_preset','ecomers');
    data.append("cloud_name","dr85pdowh");
    fetch('https://api.cloudinary.com/v1_1/dr85pdowh/image/upload',{
      method:"post",
      body:data,
    }).then((res)=>res.json())
    .then((data)=>{
      setPic(data.url.toString());
      console.log(data);
      setLoading(false)
      
    })
    .catch(err=>{
      setLoading(false);
      console.log(err);
      
    })
  }
}
  return <>
   <div className="mb-2">
        <label  className="form-label">Name</label>
         <input type="text" className="form-control" placeholder="Your Name" onChange={(e)=>setName(e.target.value)} required/>
     </div>
     <div className="mb-2">
        <label  className="form-label">Email Address</label>
         <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)} placeholder="Your Name" required/>
     </div>
       <label  class="form-label mt-1">Create Password</label>
      <input type="text" placeholder='Password'  class="form-control"onChange={(e)=>setPassword(e.target.value)}  required/>
      <label for="inputPassword5" className="form-label mt-1">Confirm Password</label>
      <input type="text" placeholder='Re-enter Password'  class="form-control"onChange={(e)=>setRe_password(e.target.value)}  required/>
      <div class="mb-3">
        <label for="formFile" className="form-label">Set Profile Image</label>
        <input class="form-control" type="file" onChange={(e)=>postDetails(e.target.files[0])} id="formFile"/>
      </div>
      <div className='d-grid gap-2 col-6 mx-auto mt-4'>
        <Button
      isLoading={loading}
      loadingText='Loading..'
      colorScheme='red'
      variant='outline'
      onClick={()=>submitHandler()}
    >
      Register
    </Button>
    
      </div>
  
  </>
}

export default Register