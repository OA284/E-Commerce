import { createContext, useEffect, useState, useContext } from "react"
import axios from "axios";
import { authContext } from "./AuthContext";
import { toast } from 'react-hot-toast';

export const cartContext = createContext();

const CartContextProvider = ({children}) => {
  const {token} = useContext(authContext)
  const [load, setLoad] = useState(false)
  
  const [numOfItems, setNumOfItems] = useState(0);
  const [product, setProduct] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState(0);
  
  async function addProductToCart(productId){
    try {
      const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
        { productId: productId },
        { headers: { token: localStorage.getItem("token") } }
      )
      getUserCart();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserCart() {
    try {
      const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", 
        { headers: { token: localStorage.getItem("token") } }
      )

      setNumOfItems(data?.numOfCartItems);
      setProduct(data?.data.products);
      setTotalPrice(data?.data.totalCartPrice);
      setCartId(data?.data._id);

      return data;
    } catch (error) {
      console.log(error, "getUserCartContext");
      
    }
  }

  useEffect(function () {
    if(token != null){
      getUserCart()
    }
  }, [token])

  async function updateProduct(id, oldCount) {
    setLoad(true)
    try {
      const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
        {count:oldCount},
        { headers: 
          { token: localStorage.getItem("token") } 
        }
      )

      setNumOfItems(data?.numOfCartItems);
      setProduct(data?.data.products);
      setTotalPrice(data?.data.totalCartPrice);
      setCartId(data?.data._id);
      setLoad(false)
      return data;
    } catch (error) {
      toast.error(error.message)
      setLoad(false)
    }
  }

  async function deleteProduct(id) {
    try {
      const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
        { headers: 
          { token: localStorage.getItem("token") }
        }
      )

      setNumOfItems(data?.numOfCartItems);
      setProduct(data?.data.products);
      setTotalPrice(data?.data.totalCartPrice);
      setCartId(data?.data._id);

      return data;
    } catch (error) {
      toast.error(error.message)
    }
  }

  async function clearCart() {
    try {
      const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", 
        { headers: { token: localStorage.getItem("token") } }
      )

      setNumOfItems(0);
      setProduct(null);
      setTotalPrice(0);
      return data;
    } catch (error) {
      console.log(error.message);
      
    }
  }

  return (
    <>
      <cartContext.Provider value={
        {addProductToCart, 
          product, 
          totalPrice, 
          numOfItems, 
          updateProduct, 
          deleteProduct, 
          clearCart, 
          load,
          cartId}
        }>
        {children}
      </cartContext.Provider>
    </>
  )
}

export default CartContextProvider