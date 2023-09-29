import { createContext, useContext, useEffect, useState } from "react";

const initialCartItems = localStorage.getItem("shopping-cart")
  ? JSON.parse(localStorage.getItem("shopping-cart"))
  : [];
const CartContext = createContext({});
const CartContextProvider = ({children}) =>{
  const [cart, setCart] = useState(initialCartItems);
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cart));
  }, [cart]);
  const cartQty = cart.reduce(
    (qty, item) => item.qty + qty,
    0
  );
  const addToCart = (id, qty, name, price, image) =>{
    setCart((currItem) =>{
      if(currItem.find((item)=>item.id == id) == null) {
        return [...currItem, {id,qty, name, price, image}]
      }else {
        return currItem.map((item)=>{
          if(item.id == id) {
            return {...item, qty: item.qty + qty}
          }else {
            return item
          }
        })
      }
    })
  }
  const getItem = (id)=>{
      return  cart.find((item)=> item.id == id)?.qty || 0;
  }; 
  const increaseCart = (id, name, price, image)=>{
      setCart((currItem)=>{
          if (currItem.find((item)=>item.id == id) == null) {
              return [...currItem, {id, qty: 1, name, price, image}]
          }else {
              return currItem.map((item)=>{
                  if(item.id === id) {
                      return {...item, qty: item.qty +1 }
                  }else {
                      return item;
                  }
              })
          }
      })
  }
  const decreaseCartqty = (id) => {
      setCart((currItem) => {
        if (currItem.find((item) => item.id === id)?.qty === 1) {
          return currItem.filter((item) => item.id !== id);
        } else {
          return currItem.map((item) => {
            if (item.id === id) {
              return { ...item, qty: item.qty - 1 };
            } else {
              return item;
            }
          });
        }
      });
  };
  const removeFromCart = (id) => {
    setCart((currItem) => currItem.filter((item) => item.id !== id));
  };
  return (
      <CartContext.Provider value={{ 
          cart,
          increaseCart,
          decreaseCartqty,
          removeFromCart,
          getItem,
          cartQty, 
          cartLen: cart.length,
          addToCart
        }}>
          {children}
      </CartContext.Provider>
  )
}

export default CartContextProvider;
export  const useCart = ()=>{
    return useContext(CartContext);
}