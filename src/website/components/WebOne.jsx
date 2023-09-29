import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Footer from './Footer'
import { useFetch } from './Landing'
import { Tnavbar } from './Navbar'
import { LazyLoadImage } from 'react-lazy-load-image-component'
const WebOne = () => {
    const [categ, setCateg] = useState([]);
    useEffect(()=>{
      fetch('http://127.0.0.1:8000/api/categories').then((res)=>res.json()).then((data)=>setCateg(data))
    },[]);
    const {id} = useParams();
    const {data, isLoading} = useFetch('http://127.0.0.1:8000/api/products');
    const product = data && data.filter((e)=>e.id == +id);
    const sub = product && product.find((e)=>e);
    const allProduct = sub && data.filter((e)=>e.sub_category_id === sub.sub_category_id);
    const getCateg = categ && categ.filter((e)=>e.sub_category.find((x)=>x.id === sub.sub_category_id));
    const subCategId = getCateg && getCateg.map((e)=>e.sub_category.map((x)=>x.id));
    const realtedData = subCategId.map((e)=>e.map((x)=>data.filter((z)=>z.sub_category_id ==x)));
    return (
    <div>
        <Tnavbar />
           {!product ? <>loading</> : ( 
              product.map((e)=>(
                <div className=' border-b-2 py-5 shadow-sm px-7 mx-auto ' key={e.id}>
                  <div  className="grid lg:grid-cols-12 gap-2 ">
                    <div className='col-span-1 h-fit'>
                        {e.images.map((x, i)=>(
                          i !=0 &&(<img src={x.image} className="w-[20vh]" key={i}/>)
                        ))}
                    </div>
                    {e.images.map((x, i)=>(
                          i == 0 && <LazyLoadImage
                          src={x.image}
                          className="w-[80vh] lg:col-span-4 "
                          key={i}
                        /> 
                    ))}
                    
                  <div className='text-xl space-y-2 capitalize lg:col-span-4 shadow-md rounded-lg border '>
                    <h1 className='px-2 font-semibold text-3xl'>name: {e.nameEn}</h1>
                    <h1 className='px-2'>description: {e.descriptionEn}</h1>
                    <h1 className='px-2'>price: {e.price} EG</h1>
                    <h1 className='px-2'>
                    stock: 
                    {e.amount > 0 ? (
                      <span> available</span>
                    ) : (
                      <span> not available</span>
                    )}
                    </h1>
                    <button className='ml-2 capitalize px-3 py-2 bg-[#0b0423] text-white rounded-xl hover:bg-[#1cda7b] duration-300 transition-colors'>add to cart</button>
                  </div>
                  </div>  
                </div>
              ))
           )}
           <div className='my-3 space-y-3 border-b-2 pb-5 px-7'>
            <h1 className='text-4xl capitalize'>but it with </h1>
            <div className='flex space-x-5 items-center'>
              {allProduct && 
                allProduct.map((e, i)=>(
                  <div key={e.id} className="w-[20vh] flex items-center">
                    {e.images.map((x, i)=>(
                          i == 0 && <LazyLoadImage
                          src={x.image}
                          className="w-fit"
                          key={i}
                        /> 
                      ))}
                    <span className=''>{allProduct.length-1 != i ? (<span className='text-xl'>+</span>):(<AiOutlineArrowRight className='text-xl ' />) }</span>
                  </div>
                ))
              }
               <button className='w-fit h-14 capitalize px-3 py-2 bg-[#0b0423] text-white rounded-xl hover:bg-[#1cda7b] duration-300 transition-colors'>add to cart</button>
            </div>
           </div>
           <div className='my-5 px-7'>
            <h1 className='text-4xl my-3 capitalize'>related products</h1>
              <div className='flex space-x-4   mx-auto'>
                {realtedData && (
                  realtedData.map((e)=>e.map((x)=>x.map((ele)=>(
                    <Link key={ele.id} className='shadow-md p-2 rounded-md ' to={`../product/${ele.id}`}>
                      {ele.images.map((x, i)=>(
                          i == 0 && <LazyLoadImage
                          src={x.image}
                          className="rounded-lg w-[20vh]"
                          key={i}
                        /> 
                      ))}
                      <h1 className='text-center'>{ele.nameEn}</h1>
                      <h1 className='text-center'>price: {ele.price}</h1>
                    </Link>
                  ))))
                )}
              </div>
           </div>
        <Footer />
    </div>
  )
}

export default WebOne



{/* <div className='col-span-6 text-xl text-center space-y-2 my-3 capitalize'>
                        <h1 className='font-semibold text-3xl'>name: {e.nameEn}</h1>
                        <h1>description: {e.descriptionEn}</h1>
                        <h1>price: {e.price} EG</h1>
                        <h1>
                        stock: 
                        {e.amount > 0 ? (
                          <span> available</span>
                        ) : (
                          <span> not available</span>
                        )}
                      </h1>
                      <button className='capitalize px-3 py-2 bg-[#0b0423] text-white rounded-xl hover:bg-[#1cda7b] duration-300 transition-colors'>add to cart</button>
                    </div> */}