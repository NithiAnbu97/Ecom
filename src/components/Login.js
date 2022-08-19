import { Button, useToast } from '@chakra-ui/react';
import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataState } from '../context/Provider';
import { BASE_URL } from '../constant';

const Login = () => {
  
  const navigate = useNavigate();
  const toast = useToast();
  const {setUser,setToken} = DataState()
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  const [showPass,setShowPass]=useState(false);
  const [loading,setLoading]=useState(false);
  
  useEffect(()=>{
    const auth = JSON.parse(localStorage.getItem("auth"))
    const customer = JSON.parse(localStorage.getItem("Customer"))
    if(auth){
      setUser(customer);
      setToken(auth)
      navigate('/home');
      
    }
    // eslint-disable-next-line
  },[])
  
  
  function hidepassword(){
    if(showPass===true) setShowPass(false)
    else setShowPass(true)
  }

  const loginHandler= async()=>{
     setLoading(true)
     if(!email||!password){
      toast({
        title:"Fill all the Fields",
        status:"warning",
        duration:3000,
        isClosable:true,
        position:"top"
    });
    setLoading(false)
     }else{
       try {
         const config = {
           headers :{
            "Content-type":"application/json",
           }
         }
         const {data}= await axios.post(`${BASE_URL}users/login`,{email,password},config);
         toast({
          title:"Login Successfull",
          status:"success",
          duration:3000,
          isClosable:true,
          position:"top"
         });
         localStorage.setItem('Customer',JSON.stringify(data));
         localStorage.setItem('auth',JSON.stringify(data.Tokens));
        const Customer = JSON.parse(localStorage.getItem("Customer"));
        const auth = JSON.parse(localStorage.getItem("auth"));
        setUser(Customer);
        setToken(auth)
        setLoading(false)
        navigate('/home')

       } catch (error) {
        setLoading(false)
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
  }
  return <>
  <div className="mb-3">
        <label className="form-label">User Email</label>
         <input type="email" value={email} className="form-control"onChange={(e)=>setEmail(e.target.value)} placeholder="Your Name"/>
     </div>
       <label className="form-label">Password</label>
       <div className="input-group mb-3">
          <input value={password} type={showPass?"text":"password"} className="form-control"onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
        </div>
        <div className="form-check d-flex flexDirection-row">
        <input className="form-check-input" type="checkbox" onClick={()=>hidepassword()} id="flexCheckDefault"/>
        &nbsp;&nbsp; <label className="form-check-label" for="flexCheckDefault">
          Show Password 
      </label>
      <p style={{cursor:"pointer",paddingLeft:"100px"}} className="text-primary" onClick={()=>{
        setEmail("demo@gmail.com");
        setPassword("123")
      }}>Demo Account</p>
      
   </div>
      <div className='d-grid gap-2 col-6 mx-auto mt-4'>
      <Button
       isLoading={loading}
       loadingText='Submitting'
       colorScheme='red'
       variant='outline'
      onClick={()=>loginHandler()}
    >
      Login
    </Button>
      </div>
  </>
}

export default Login
