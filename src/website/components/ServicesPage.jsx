import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import { useFetch } from './Landing'
import { Tnavbar } from './Navbar'
import { AiOutlineHourglass } from 'react-icons/ai'
import { Scroll } from './Scroll'
const ServicesPage = () => {
    const {data, isLoading} = useFetch('http://127.0.0.1:8000/api/categories');
    const serve = data && data.filter((e)=>e.prand =="Services");

    return (
        <div>
            <Tnavbar/>
            <section className='capitalize'>
                <div className="bg-[url('../../../public/background.png')] grid lg:grid-cols-12 h-[80vh] items-center">
                    <h1 className='text-8xl font-reNew lg:col-span-4 lg:col-start-2'>services</h1>
                    <img src="/serve2.png" alt="" className='lg:col-span-6 ' />
                </div>
                {isLoading? ((<AiOutlineHourglass className='text-black mx-auto text-4xl animate-spin' />)): (
                    serve.map((e, i)=>(
                        i %2 == 0? (
                        <div key={e.id} className="grid lg:grid-cols-12 items-center border-b-2 py-5 gap-8">
                            <div className='lg:col-span-6 mx-auto'>
                                <img src={e.image} alt="" className='lg:pl-5' />
                            </div>
                            <div className='lg:col-span-6 space-y-4 mx-auto'>
                                <h1 className='lg:text-4xl text-2xl font-bold text-center'>{e.categoryNameEn}</h1>
                                <p className='lg:text-2xl text-xl text-center'>{e.desctriptionEn}</p>
                                <div className='flex space-x-4  text-xl justify-center '>
                                    <Link className='bg-[#0b0423] rounded-lg hover:bg-[#1cda7b] text-white p-2 duration-300 transition-colors' to={`/serve/${e.id}`}>load more</Link>
                                    <Link className='bg-[#0b0423] rounded-lg hover:bg-[#1cda7b] text-white p-2 duration-300 transition-colors'>contact us</Link>
                                </div>
                            </div>
                        </div>
                        ):(
                            <div key={e.id} className="grid lg:grid-cols-12 items-center border-b-2 py-5 gap-8">
                                <div className='lg:col-span-6 space-y-4 mx-auto'>
                                    <h1 className='lg:text-4xl text-2xl font-bold text-center'>{e.categoryNameEn}</h1>
                                    <p className='lg:text-2xl text-xl text-center'>{e.desctriptionEn}</p>
                                    <div className='flex space-x-4  text-xl justify-center '>
                                        <Link className='bg-[#0b0423] rounded-lg hover:bg-[#1cda7b] text-white p-2 duration-300 transition-colors' to={`/serve/${e.id}`}>load more</Link>
                                        <Link className='bg-[#0b0423] rounded-lg hover:bg-[#1cda7b] text-white p-2 duration-300 transition-colors'>contact us</Link>
                                    </div>
                                </div>
                                <div className='lg:col-span-6 mx-auto'>
                                    <img src={e.image} alt="" className='lg:pl-5' />
                                </div>
                            </div>
                        )
                    ))
                )}
            </section>
            <Scroll />
            <Footer />
        </div>
    )
}

export default ServicesPage