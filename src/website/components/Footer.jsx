import React, { useEffect, useState } from 'react'
import { useFetch } from './Landing';
import { Link } from 'react-router-dom';
import { AiOutlineMail, AiOutlinePhone, AiOutlineWhatsApp, AiOutlineMobile, AiOutlineFacebook, AiOutlineYoutube, AiOutlineLinkedin, AiOutlineInstagram, AiFillYoutube, AiOutlineHourglass } from 'react-icons/ai'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Footer = () => {

  const [categ, setCateg] = useState([]);
  useEffect(()=>{
    const fetchData = async()=>{
      const data = await fetch('http://127.0.0.1:8000/api/categories');
      const json = await data.json();
      setCateg(json);
    }
    fetchData();
  },[])
  const current = new Date();
  const date = `${current.getFullYear()}`;
  const {data, isLoading} = useFetch('http://127.0.0.1:8000/api/contactus');
  return (
    <section className='bg-[#0b0423] lg:w-full w-full'>
      <div id="footer" className=' grid lg:grid-cols-12 grid-cols-1 bg-[#0b0423] lg:gap-2 gap-8 lg:px-0 px-3 text-white text-2xl capitalize '>
        <div className='lg:col-span-3 col-span-1'>
          <img src='../../../public/logo.png' alt="imageLogo" className='lg:h-3/4 h-fit' />
        </div>
        <div className='lg:col-span-3'>services
        {categ && categ.slice(0,5).map((e, i)=>(
          <ul className='space-y-3 mt-3' key={i}>
            <Link className='hover:underline cursor-pointer text-gray-400' to={`/serve/${e.id}`}>{e.categoryNameEn}</Link>
          
        </ul>
        ))}
        </div>
        <div className='lg:col-span-2'>get to know us
          <ul className='space-y-3 mt-3 grid lg:grid-cols-1 '>
            <Link className='hover:underline cursor-pointer text-gray-400' to={'/about'}>about us</Link>
            <Link className='hover:underline cursor-pointer text-gray-400' to={'/ourwork'}>our work</Link>
            <Link className='hover:underline cursor-pointer text-gray-400' to={'/blog'}>blog</Link>
            <Link className='hover:underline cursor-pointer text-gray-400' to={'/offer'}>offers</Link>
          </ul>
        </div>
        <div className='lg:col-span-2'>
          <ul className='space-y-4 grid lg:col-span-1'>
            <Link className='cursor-default'>cookies policy</Link>
            <Link className='hover:underline cursor-pointer text-gray-400'>support</Link>
            <Link className='hover:underline cursor-pointer text-gray-400'>terms of services</Link>
            <Link className='hover:underline cursor-pointer text-gray-400' to={'/career'}>careers</Link>
          </ul>
        </div>
        <div className='lg:col-span-2'>contact us
          {
            isLoading? (<AiOutlineHourglass className='text-black mx-auto text-4xl animate-spin' />) : (
              data.map((e)=>(
                <ul key={e.id} className="space-y-3 mt-3">
                  <li className='flex items-center'><AiOutlineMail className='mr-2'/>{e.email}</li>
                  <li className='flex items-center'><AiOutlineMobile className='mr-2'/>{e.phone}</li>
                  <li className='flex items-center'><AiOutlineWhatsApp className='mr-2' />{e.whatsApp}</li>
                  <li className='flex items-center'><AiOutlinePhone className='mr-2' />{e.tel}</li>
                  <li className='flex items-center space-x-3 '>
                    <span>follow us</span>
                    <Link><AiOutlineFacebook /></Link>
                    <Link><AiOutlineLinkedin /></Link>
                    <Link><AiFillYoutube /></Link>
                    <Link><AiOutlineInstagram /></Link>
                  </li>
                </ul>
              ))
            )
          }
        </div>
      </div>
      <p className='text-center text-white text-xl uppercase lg:py-0 py-3'>engix &#169;{date}</p>
    </section>
  )
}

export default Footer