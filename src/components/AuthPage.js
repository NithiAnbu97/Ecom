import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';

const AuthPage = () => {
 
  const [toggle,setToggle]=useState(false)

  // useEffect(()=>{
  //   const user = JSON.parse(localStorage.getItem("Customer"))
  //   if(user) navigate('/home')
  // },[])
  
  return <>
  <div className='con'>
  <div className='auth-title'>
  <h1 class="navbar-brand fs-2 text-danger">STYLES <span className='text-dark'>WEAR</span></h1>
      </div>
    <div className='authBox'>
      <div className='auth-btn'>
        <button className={!toggle?"btn btn-danger":"btn"} onClick={()=>setToggle(false)}>Login</button>
        <button className={toggle?"btn btn-danger":"btn"} onClick={()=>setToggle(true)}>Register</button>
      </div>
      <div className='auth-main'>
       {
         toggle?<Register/>:<Login/>
       }
      </div>
    </div>
  </div>
  </>
}

export default AuthPage