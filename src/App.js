import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import AuthPage from './components/AuthPage';
import ProtectedRoute from './ProtectedRoute';
import Home from './components/Home';
import Productpage from './components/Productpage';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import { DataState } from './context/Provider';
import Order from './components/Order';
import AdminPanel from './admin/AdminPanel';
import Create from './admin/Create';

function App() {
  const {setcartIteam}=DataState();
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("cart"));
    if(data ===null){

    }else{
      setcartIteam(data);
      console.log(data);
    }
    // eslint-disable-next-line
},[])

  return <>
   <Router>
     <Routes>
       <Route path='/' element={<AuthPage/>}/>
      
       <Route element={<ProtectedRoute/>}>
        <Route path='/home' element={<Home/>}/>
        <Route path='/admin' element={<AdminPanel/>}/>
        <Route path='/product' element={<Productpage/>}/>
        <Route path='/selected' element={<ProductDetail/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/create' element={<Create/>}/>
       </Route>
     </Routes>
   </Router>
  </>

}

export default App;
