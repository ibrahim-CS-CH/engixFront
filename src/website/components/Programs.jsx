import React, { useMemo, useState } from 'react'
import { AiOutlineHourglass } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import { useFetch } from './Landing'
import { Tnavbar } from './Navbar'
import { Scroll } from './Scroll'

const Programs = () => {
    const {data, isLoading} = useFetch('http://127.0.0.1:8000/api/SubCategoryProgram');
    const [click, setClick] = useState(0);



    const filterPrograms = useMemo(()=>
        data && data.filter((e)=>e.id == +click)
    , [click])
    return (
        <div>
            <Tnavbar />
            <section className='capitalize'>
                <div className="bg-[url('../../../public/background.png')] grid lg:grid-cols-12 h-[70vh] items-center">
                    <h1 className='text-8xl font-reNew lg:col-span-4 lg:col-start-2'>programs</h1>
                    <img src="/serve2.png" alt="" className='lg:col-span-6 ' />
                </div>
                {isLoading ? (<>isloading</>) :(<>
                    <div className='grid lg:grid-cols-12 gap-8 py-5'>
                    
                        <div className='col-span-12 flex justify-around text-xl font-real '>
                                <button  className={`border-2 p-3 capitalize bg-gradient-to-r hover:from-[#1cda7b] hover:to-[#0c7482] hover:text-white duration-300 ease-in-out transition-all ${click ==0 && "bg-gradient-to-r from-[#1cda7b] to-[#0c7482] text-white "}`} onClick={()=>setClick(0)}>all</button>
                                {data.slice(0,5).map((e)=>(
                                <button key={e.id} id={e.id} className={`border p-3 capitalize bg-gradient-to-r hover:from-[#1cda7b] hover:to-[#0c7482] hover:text-white duration-300 ease-in-out transition-all ${click == e.id && "bg-gradient-to-r from-[#1cda7b] to-[#0c7482] text-white "} `} onClick={(e)=>setClick(e.target.id)}>    
                                    {e.subCategoryEn}
                                </button>
                                ))}
                        </div>
                        {click == 0 ? (
                            <div className='lg:col-start-2 col-span-10 flex flex-wrap gap-8 justify-center'>
                                {data.slice(0,5).map((e)=>(
                                    e.program.map((x)=>(
                                        <Link className=' border-2 text-center space-y-8 p-3' to={`/programs/${x.id}`} key={x.id}>
                                            <div className=' h-44 w-80 overflow-hidden'>
                                                <img src={x.image} alt={x.nameProgramEn} />
                                            </div>
                                            <h1 className='text-xl font-real'>{x.nameProgramEn}</h1>
                                        </Link>
                                    ))
                                ))}
                            </div>
                        ):(
                            <div className='lg:col-start-2 col-span-10 flex flex-wrap gap-8 justify-center'>
                                {filterPrograms.map((e)=>(
                                    e.program.map((x)=>(
                                        <Link to={`/programs/${x.id}`} className=' border-2 text-center space-y-4 p-3' key={x.id}>
                                            <div className=' h-44 w-80 overflow-hidden'>
                                                <img src={x.image} alt={x.nameProgramEn} />
                                            </div>
                                            <h1 className='text-xl font-real'>{x.nameProgramEn}</h1>
                                        </Link>
                                    ))
                                ))}
                            </div>
                        )}
                        
                        </div>
                    </>
                    )}
                
                {/* {isLoading? ((<AiOutlineHourglass className='text-black mx-auto text-4xl animate-spin' />)): (
                    program.map((e, i)=>(
                        i %2 == 0? (
                        <div key={e.id} className="grid lg:grid-cols-12 items-center border-b-2 py-5 gap-8">
                            <div className='lg:col-span-6 mx-auto'>
                                <img src={e.image} alt="" className='lg:pl-5' />
                            </div>
                            <div className='lg:col-span-6 space-y-4 mx-auto'>
                                <h1 className='lg:text-4xl text-2xl font-bold text-center'>{e.categoryNameEn}</h1>
                                <p className='lg:text-2xl text-xl text-center'>{e.desctriptionEn}</p>
                                <div className='flex space-x-4  text-xl justify-center '>
                                    <Link className='bg-[#0b0423] rounded-lg hover:bg-[#1cda7b] text-white p-2 duration-300 transition-colors' to={`/program/${e.id}`}>load more</Link>
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
                                        <Link className='bg-[#0b0423] rounded-lg hover:bg-[#1cda7b] text-white p-2 duration-300 transition-colors' to={`/program/${e.id}`}>load more</Link>
                                        <Link className='bg-[#0b0423] rounded-lg hover:bg-[#1cda7b] text-white p-2 duration-300 transition-colors'>contact us</Link>
                                    </div>
                                </div>
                                <div className='lg:col-span-6 mx-auto'>
                                    <img src={e.image} alt="" className='lg:pl-5' />
                                </div>
                            </div>
                        )
                    ))
                )} */}
            </section>
            <Scroll />
            <Footer />
        </div>
    )
}

export default Programs