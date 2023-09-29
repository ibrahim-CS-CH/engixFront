import React from 'react'
import { AiOutlineHourglass } from 'react-icons/ai'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Footer from './Footer'
import { useFetch } from './Landing'
import { Tnavbar } from './Navbar'

const WebBlog = () => {
    const {data, isLoading} = useFetch("http://127.0.0.1:8000/api/suppliers");
    return (
        <div className="bg-[url('background.png')] ">
            <Tnavbar />
            <section className="grid lg:grid-cols-12 gap-8 ">
                <div className="bg-[url('background.png')] lg:h-[70vh] lg:col-span-12 grid lg:grid-cols-2 items-end">
                    <div className='text-center my-auto'>
                        <h1 className='text-6xl text-white'>Engix<span className='block capitalize'>blog</span></h1>
                    </div>
                    <div>
                        <img src="printer.png" alt="" />
                    </div>
                </div>
                <div className='bg-white lg:col-span-12 grid lg:grid-cols-12 lg:content-center  gap-8 lg:h-fit max-h-fit px-32 py-20'>
                {isLoading ? (<AiOutlineHourglass className='text-black mx-auto text-4xl animate-spin' />) : (
                    data.map((e)=>(
                        <div key={e.id} className={`lg:col-span-4 text-center col-span-1 `}>
                            <LazyLoadImage src={e.image} />
                            <h1 className='text-2xl'>{e.nameEn}</h1>
                        </div>
                    ))
                )}
                </div>
            </section>
            <Footer />
        </div>
  )
}

export default WebBlog