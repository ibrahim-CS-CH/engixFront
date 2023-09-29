// import {  createContext, useContext, useState } from 'react'
// const ShoppingCartContext = createContext({});

// export const ShoppingCartProvider = ({Children}) => {
//     const [cart, setCart]= useState([]);
//     const getItems = (id)=>{
//         return cart.find((e) => e.id == id)?.qty || 0;
//     }
//     const decreaseQty = (id) => {
//         setCart((currItem)=>{
//             if(currItem.find(e=> e.id == id) == null){
//                 return currItem.filter((e)=> e.id != id);
//             }else {
//                 return currItem.map((e)=>{
//                     if(e.id == id) {
//                         return {...e, qty: e.qty -1 }
//                     }else {
//                         return e;
//                     }
//                 })
//             }
//         })
//     }
//     const increaseQty = (id) => {
//         setCart((currItem)=>{
//             if(currItem.find(e=> e.id == id) == null){
//                 return [...currItem, {id, qty: 1}]
//             }else {
//                 return currItem.map((e)=>{
//                     if(e.id == id) {
//                         return {...e, qty: e.qty + 1}
//                     }else {
//                         return e;
//                     }
//                 })
//             }
//         })
//     }
//     const removeItem = (id) => {
//         setCart((currItem) => currItem.filter((e)=>e.id != id));
//     }
//   return (
//     <ShoppingCartContext.Provider value={{ cart, getItems, increaseQty, decreaseQty, removeItem }}>
//         {Children}
//     </ShoppingCartContext.Provider>
//   )
// }


// export function useShopping () {
//     return useContext(ShoppingCartContext);
// }
