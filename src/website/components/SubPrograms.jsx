import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import { Tnavbar } from './Navbar';
import { Scroll } from './Scroll';
import {BsCheck2Square} from 'react-icons/bs'
import Shared from './Shared'
const localCache = {};
const SubPrograms = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const fetchPrograms = async()=>{
    const fetchData = await fetch(`http://127.0.0.1:8000/api/Program/${id}`);
    const json = await fetchData.json();
    localCache[id] = json || [];
    setData(localCache[id]);
  }
  useEffect(()=>{
    if(localCache[id]) {
      setData(localCache[id]);
    }else {
      fetchPrograms();
    }
  }, [id]);
  return (
    <div>
      <Tnavbar />
      <section className="capitalize font-real ">
        {data.map((e)=>(
          <div className="grid lg:grid-cols-12 items-center h-[70vh] lg:gap-0 gap-8 py-5 bg-[url('/public/background.png')] " key={e.id}>
            <div className="lg:col-span-6 text-center">
              <h1 className="lg:text-4xl text-2xl font-semibold text-white capitalize ">
                {e.nameProgramEn}
              </h1>
            </div>
            <div className="lg:col-span-6 ">
              <img src={e.image} alt="" className="h-[60vh]" />
            </div>
          </div>
        ))}
        <div className='border-b-2 py-20'>
          {data.map((e)=>(
            <div key={e.id} className="text-center text-2xl font-semibold ">
              <h1 className='py-8 bg-gradient-to-r from-[#1cda7b] to-[#0c7482] w-fit inline-block text-transparent bg-clip-text font-semibold'>what is {e.nameProgramEn} ?</h1>
              {e.descriptionEn.split(".").map((x, i)=>(
                <div className='flex items-center mx-96 space-x-1' key={i}>
                  <BsCheck2Square className='inline-block text-red-500'/>
                  <p key={i}>{x}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className='border-b-2 py-20'>
          models
        </div>
        <div className='border-b-2 py-10'>
          {data.map((e)=>(
            <div key={e.id} className="text-center">
              <h1 className='py-8 bg-gradient-to-r from-[#1cda7b] to-[#0c7482] w-fit inline-block text-transparent bg-clip-text font-semibold text-2xl'>try your free version Now..</h1>
              <a className='block p-3 border w-fit mx-auto my-5 capitalize bg-gradient-to-r hover:from-[#1cda7b] hover:to-[#0c7482] hover:text-white duration-300 ease-in-out transition-all' target={'_blank'}  href={`${e.test}`}>version</a>
              <div className='border w-fit mx-auto p-3'>
                <h1 className='normal-case'>useName: {e.userName}</h1>
                <h1 className='normal-case'>password: {e.password}</h1>
              </div>
            </div>
          ))}
          
        </div>
        <div className='border-b-2 py-10'>
        {data.map((e)=>(
            <div key={e.id} className="text-center">
              <h1 className='py-8 bg-gradient-to-r from-[#1cda7b] to-[#0c7482] w-fit inline-block text-transparent bg-clip-text font-semibold text-2xl'>check how to use your version..</h1>
              <iframe width="890" height="445" src={`https://www.youtube.com/embed/WQRe7r_MyVA`} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  className='mx-auto'></iframe>
            </div>
          ))}
        </div>
        <div className='border-b-2'>
          <Shared />
        </div>
      </section>
      <Scroll />
      <Footer />
    </div>
  );
};
export default SubPrograms