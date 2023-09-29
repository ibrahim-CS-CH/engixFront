import React from 'react'
import { useFetch } from './Landing'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AiOutlineHourglass } from 'react-icons/ai';
 
const Suppliers = () => {
  const {data, error, isLoading} = useFetch("http://127.0.0.1:8000/api/suppliers");
  console.log();
  return (
    <section className='mt-3 group h-[36vh] overflow-hidden bg-[#0b0423]'>
      <div className='text-center text-white bg-[#0b0423] text-7xl py-6 uppercase'><span className='text-[#1cda7b]'>our</span> suppliers</div>
      <ul className='text-2xl h-16 animate-[move_9s_linear_infinite] group-hover:animate-none group-hover:justify-center flex whitespace-nowrap space-x-32 mt-9 '>
        {isLoading ? (<AiOutlineHourglass className='text-black mx-auto text-4xl animate-spin' />) :
        (data.map((e)=>(
          <li  key={e.id} className=" text-center bg-[url('background.png')] w-40 h-40 items-center rounded-lg">
            <LazyLoadImage src={e.image} className="w-28 bg-[url('background.png')] mx-auto mt-5 rounded-full group" alt={e.nameEn} />
            <p className=' text-white relative -top-9 opacity-0 group-hover:opacity-90 '>{e.nameEn}</p>
          </li>
        )))}
      </ul>
    </section>
  )
}

export default Suppliers