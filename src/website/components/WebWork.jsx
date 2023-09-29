import React, { useEffect, useState } from 'react'
import { AiOutlineHourglass } from 'react-icons/ai'
import Footer from './Footer'
import { useFetch } from './Landing'
import { Tnavbar } from './Navbar'
import { Scroll } from './Scroll'

const WebWork = () => {
    const {data, isLoading} = useFetch('http://127.0.0.1:8000/api/categoryOurWork');
    const [id, setId] = useState(0);
    const [work, setWork] = useState([]);
    const fetchData = async()=>{
        const fetchWork = await fetch('http://127.0.0.1:8000/api/ourWork');
        const json = await fetchWork.json();
        setWork(json);
    }
    useEffect(()=>{
        fetchData();
    }, [])
    const filter = work.filter((e)=>e.category_our_work_id == +id);
    
    return (
    <div>
        <Tnavbar />
        <section>
            <div className="bg-[url('background.png')] lg:h-[70vh] lg:col-span-12 grid lg:grid-cols-2 items-center">
                <div className='text-center'>
                    <h1 className='text-6xl text-white uppercase'>Engix<span className='block capitalize pt-5'>our work</span></h1>
                </div>
                <div>
                    <img src="ourWork.webp" alt="" className='h-[50vh] rounded-lg' />
                </div>
            </div>
            <div className='grid lg:grid-cols-12 mt-3'>
                {isLoading ? (<AiOutlineHourglass className='text-black mx-auto text-4xl animate-spin'/>)
                    :(
                        <div className='lg:col-span-12 flex space-x-16 mx-20 text-lg capitalize font-real'>
                            <button onClick={(e)=>setId(e.target.id)} id={0} className='bg-gradient-to-r  from-[#1cda7b] to-[#0c7482] rounded-md  hover:from-[#0c7482] hover:to-[#052a2f]  py-2 px-4 text-center text-white'>all</button>
                            {data.map((e)=>(
                                <button key={e.id} id={e.id} onClick={(e)=>setId(e.target.id)} className=" bg-gradient-to-r  from-[#1cda7b] to-[#0c7482] rounded-md  hover:from-[#0c7482] hover:to-[#052a2f]  py-5  text-center text-white">{e.nameEn}</button>
                            ))}
                        </div>
                    )   
                }
            </div>
            <div className='grid lg:grid-cols-12 gap-16 my-8 max-w-6xl mx-auto relative'>
                {id == 0 ? 
                    work.map((e)=>(
                        <div key={e.id} className="lg:col-span-3 mx-auto text-center overflow-hidden group relative ">
                            <div className='w-60 h-60 overflow-hidden items-center justify-center z-40 bg-red-300 '>
                                {/* <img src={e.image} alt="" /> */}
                            </div>
                            <div className="bg-[url('background.png')] bg-contain absolute top-6 left-8 w-40 m-2 h-40 text-center  group-hover:block opacity-0 group-hover:opacity-70 transition-opacity duration-500 ease-linear">

                            <h1 className="text-white font-semibold h-fit inline-block my-16 ">
                                {e.nameEn}
                            </h1>
                            </div>
                        </div>
                    ))
                 : (filter.map((e)=>(
                    <div key={e.id} className="lg:col-span-3 mx-auto text-center overflow-hidden group relative ">
                            <div className='w-60 h-60 overflow-hidden items-center justify-center z-40 bg-red-300 '>
                                <img src={e.image} alt="" />
                            </div>
                            <div className="bg-[url('background.png')] bg-contain absolute top-6 left-8 w-40 m-2 h-40 text-center  group-hover:block opacity-0 group-hover:opacity-70 transition-opacity duration-500 ease-linear">

                            <h1 className="text-white font-semibold h-fit inline-block my-16 ">
                                {e.nameEn}
                            </h1>
                            </div>
                        </div>
                 )))}
            </div>
            <Scroll />
        </section>
        <Footer />
    </div>
  )
}

export default WebWork