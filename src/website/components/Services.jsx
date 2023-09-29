import React from 'react'
import { AiOutlineHourglass, AiOutlineSolution, AiOutlineSound } from 'react-icons/ai'
import { FaFingerprint } from 'react-icons/fa'
import { GiCctvCamera } from 'react-icons/gi'
import { DiWebplatform } from 'react-icons/di'
import { useFetch } from './Landing'
const Services = () => {
  const {data,isLoading } = useFetch('http://127.0.0.1:8000/api/categories');
  
  return (
    <section className=" bg-[url('../../meet.jpg')]  bg-cover h-[90vh] text-black font-real">
      <div className="grid lg:grid-cols-12 text-black pt-[10%]">
        <div className=' text-black text-center lg:text-7xl font-semibold   lg:col-span-2 lg:col-start-2 uppercase'><span className='text-[#1cda7b]'>our</span> <h1>services</h1> <div className='mt-10 underline h-1 bg-[#1cda7b] w-28'></div></div>
        <div className="lg:col-span-7 lg:col-start-5 grid grid-cols-2 gap-8 h-[50vh]  bg-white bg-opacity-90  ">
          {isLoading ? (<AiOutlineHourglass className='text-black mx-auto text-4xl animate-spin' />):(
            data.slice(0,4).map((e)=>(
              <div className='lg:col-span-1 gap-4 pl-3 pt-4 items-center my-auto' key={e.id}>
                <h1 className='text-xl uppercase font-semibold items-center'><span className=''>{e.categoryNameEn.slice(0,4)}</span>{e.categoryNameEn.slice(4)}</h1>
                <div className='underline h-1 bg-[#1cda7b] w-11 mt-2'></div>
                <h1 className='text-lg text-gray-700'>{e.desctriptionEn}</h1>
              </div>
            ))
          )}
        </div>

        
      </div>
    </section>
  )
}

export default Services