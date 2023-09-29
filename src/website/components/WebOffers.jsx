import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useOffer from '../../hooks/useOffer'
import Footer from './Footer'
import { useFetch } from './Landing'
import { Tnavbar } from './Navbar'
import { AiOutlineHourglass } from 'react-icons/ai'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const WebOffers = () => {
    const [id, setId] = useState(0);
    
    const {data, isLoading} = useFetch('http://127.0.0.1:8000/api/categoryoffers');
    const {dataOffer, filterData} = useOffer(id);
    const handleClick = (e) => {
        e.preventDefault();
        setId(+e.target.id)

    }
    const handleWhatsapp = (e)=>{
        e.preventDefault();
        let url = `https://web.whatsapp.com/send?phone=+201273285866`;
        window.location.replace(url);
    }

  return (
    <div className="bg-[url('background.png')]">
        <Tnavbar />
        <div className="lg:h-screen lg:col-span-12 grid lg:grid-cols-2 items-center">
                <div className='text-center my-auto'>
                    <h1 className='text-6xl text-white'>Engix<span className='block capitalize my-6'>offers</span></h1>
                </div>
                <div>
                    <img src="offers.jpg" className='h-[70vh] rounded-3xl' alt="" />
                </div>
        </div>
        
            {isLoading? (<AiOutlineHourglass className='text-black mx-auto text-4xl animate-spin' />): (
                <section className="grid grid-cols-12 mt-3 bg-white h-fit pb-16  ">
                    <div className='flex w-full justify-center text-white space-x-20 text-xl capitalize pt-5 lg:col-span-12'>
                        <NavLink className='bg-gradient-to-r from-[#1cda7b] to-[#0c7482] rounded-md  hover:from-[#0c7482] hover:to-[#052a2f]  py-2 px-4' id="0" onClick={handleClick}>all</NavLink>
                        {data.map((e)=>(
                            <NavLink key={e.id} className='bg-gradient-to-r  from-[#1cda7b] to-[#0c7482] rounded-md  hover:from-[#0c7482] hover:to-[#052a2f]  py-2 px-4' id={e.id} onClick={handleClick}>{e.nameEn}</NavLink>
                        ))}
                    </div>
                    {filterData.length ? (
                        <div className='grid lg:grid-cols-12 gap-8 lg:col-span-12 mx-auto'>
                            {filterData.map((e)=> (
                                <div key={e.id} className="lg:col-span-12 lg:grid lg:grid-cols-12 mt-6 text-3xl p-3 rounded-3xl overflow-hidden w-full lg:gap-8 shadow-lg items-center">
                                    <LazyLoadImage src={e.image} className="col-span-3" alt="" />
                                    <div className='col-span-9 grid shadow-lg rounded-lg space-x-3 h-fit space-y-4'>
                                        <h1 className='font-semibold pl-3'>{e.nameAr}</h1>
                                        <p className='text-2xl'>{e.descriptionAr}</p>
                                        <Link className='bg-[#0b0423] hover:bg-[#1cda7b] duration-300 transition-colors text-white rounded-lg px-2 w-fit h-fit py-2 ' onClick={handleWhatsapp} >Order Now</Link>
                                        <h1 className=''>offer ended at <span className=''>{e.expiresDate}</span></h1>
                                        <h1>offer status</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ): 
                    (
                        <div className='grid lg:grid-cols-12 gap-8 lg:col-span-12 mx-auto'>
                            { dataOffer.map((e) => (
                                <div key={e.id} className="lg:col-span-12 lg:grid lg:grid-cols-12 mt-6 text-3xl p-3 rounded-3xl overflow-hidden w-full lg:gap-8 shadow-lg items-center">
                                <LazyLoadImage src={e.image} className="col-span-3" alt="" />
                                <div className='col-span-9 grid shadow-lg rounded-lg space-x-3 h-fit space-y-4'>
                                    <h1 className='font-semibold pl-3'>{e.nameAr}</h1>
                                    <p className='text-2xl'>{e.descriptionAr}</p>
                                    <Link className='bg-[#0b0423] hover:bg-[#1cda7b] duration-300 transition-colors text-white rounded-lg px-2 w-fit h-fit py-2 ' onClick={handleWhatsapp} >Order Now</Link>
                                    <h1 className=''>offer ended at <span className=''>{e.expiresDate}</span></h1>
                                    <h1>offer status</h1>
                                </div>
                            </div>
                            ))}
                        </div>
                    
                    )
                    }
                </section>
            )}
       

        <Footer />



    </div>
  )
}

export default WebOffers


// bg-[url('background.png')]