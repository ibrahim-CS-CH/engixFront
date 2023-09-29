import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import { useFetch } from './Landing'
import { Tnavbar } from './Navbar'
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(1);
    const {data} = useFetch('http://127.0.0.1:8000/api/products');
    useEffect(()=>{
      const data = window.localStorage.getItem('cart');
     (data && setCart(data))
    },[data])
    const asd = (String(cart.slice(1,-1)).split(","));
    const products = data && data.filter((e)=> asd.find((x)=>e.id == +x))
    const handleDecrease = (e)=>{
      setCount(e => e - 1)
    }  
    // 
    const handleIncrease =  (e) =>{
      setCount(e =>e+1)
    }



    const Counter  = ()=>{
      const [count, setCount] = useState(1);
      return (
        <div className='space-x-4'>
          <button onClick={()=>count!=0 && setCount(count-1)}>-</button>
          <span>{count}</span>
          <button onClick={()=>setCount(count+1)}>+</button>
        </div>
      )
    }
  return (
    <div>
        <Tnavbar />
        <section>
          {products && (
            <div className='grid lg:grid-cols-4'>
              {products.map((e)=>(
                <div
                  className="lg:col-span-4   shadow-lg w-1/2 mx-auto pb-3 my-4 rounded-2xl overflow-hidden space-y-1"
                  key={e.id}
                >
                  {e.images.map((x, i)=>(
                      i == 0 && <LazyLoadImage
                      src={x.image}
                      className="w-fit mx-auto"
                      key={i}
                    /> 
                  ))}
                  <div className="text-center space-y-4">
                    <h1 className="font-semibold text-2xl">{e.nameEn}</h1>
                    <h1>price: {e.price} EG</h1>
                    <h1>
                      stock:{" "}
                      {e.amount > 0 ? (
                        <span>available</span>
                      ) : (
                        <span>not available</span>
                      )}
                    </h1>
                  <h1>
                    description: {e.descriptionEn.slice(0, 50)}
                  </h1>
                  </div>
                  <div className=' flex text-center space-x-8 font-real text-4xl justify-center'>
                    <Counter />
                  
                  </div>
                  <div className=" text-center">
                    <Link className="bg-[#0b0423]  px-3 py-1 rounded-lg text-white hover:bg-[#1cda7b] duration-300 transition-colors ">
                      order now
                    </Link>
                  </div>
                  
                </div>
              ))}
            </div>
          )}
        </section>
        <Footer />
    </div>
  )
}

export default Cart