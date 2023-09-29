import React from 'react'
import { AiOutlineHourglass } from 'react-icons/ai';
import { useFetch } from './Landing'
const AboutUs = () => {
  const {data, isLoading} = useFetch('http://127.0.0.1:8000/api/aboutus');
  return (
    <div className='grid lg:grid-cols-12 lg:mt-8  text-white items-center h-[90vh] overflow-hidden bg-white '>
                {isLoading ? ((<AiOutlineHourglass className='text-black mx-auto text-4xl animate-spin' />)) : (
                    data && data.map((e)=>(
                      <div className='lg:col-span-12 grid lg:grid-cols-12 max-h-fit items-center' key={e.id}>
                        <div className='lg:col-span-4 lg:col-start-2 lg:text-2xl ml-5 space-y-16 text-black ' >
                            <article>
                              <h1 className='uppercase font-semibold text-5xl pb-5 '><span className='text-[#1cda7b] underline '>who</span> we are</h1>
                              <p>{e.whoWeAreEn}</p>
                            </article>
                            <article>
                              <h1 className='uppercase font-semibold  text-5xl pb-5'><span className='text-[#1cda7b] underline '>our</span> mession</h1>
                              <h1>{e.whoWeAreEn}</h1>
                            </article>
                            <article>
                              <h1 className='uppercase font-semibold text-5xl pb-5 '><span className='text-[#1cda7b] underline '>our</span> vision</h1>
                              <h1>{e.whoWeAreEn}</h1>
                            </article>
                          </div>
                          <div key={e.id} className="lg:col-span-5 lg:col-start-7 ">
                              <img src='logoMove.gif' alt="" className='h-[60vh]' />
                          </div>
                        
                      </div>
                      
                    ))
                )}
    </div>
  )
}

export default AboutUs