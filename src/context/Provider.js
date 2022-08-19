import React, { createContext, useContext, useState } from 'react'
const dataContext = createContext();
const Provider = ({children}) => {
    const [user,setUser] = useState();
    const [selectedProduct,setSelectedProduct] = useState();
    const [Product,setProduct] = useState([]);
    const [catagorys,setCatagory]= useState([]);
    const [filter,setFilter]= useState([]);
    const [catName,setcatName]= useState();
    const [token,setToken]= useState();
    const [cartIteam,setcartIteam] = useState([]);
    const [size,setSize]=useState();
    const [quantity,setQuantity]=useState("1");
    const [buyProduct,setbuyProduct]=useState();


  return <>
  <dataContext.Provider value={{
      user,setUser,
      Product,setProduct,
      selectedProduct,setSelectedProduct,
      token,setToken,catName,setcatName,
      catagorys,setCatagory,filter,setFilter,cartIteam,setcartIteam,
      size,setSize,buyProduct,setbuyProduct,quantity,setQuantity
  }}>
      {children}
  </dataContext.Provider>
  </>
}
export const DataState = ()=>{
    return useContext(dataContext)
}


export default Provider