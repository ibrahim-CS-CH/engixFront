import React from 'react'
import { Tnavbar } from './Navbar'
import Footer from './Footer'
import { useFetch } from './Landing'
import { AiOutlineHourglass } from 'react-icons/ai'
const Webcareer = () => {
  const {data, isLoading} = useFetch('http://127.0.0.1:8000/api/jobs');
  return (
    <div className="bg-[url('background.png')]">
        <Tnavbar />
        <section className='grid lg:grid-cols-12'>
          {/* <div className="h-[70vh] overflow-hidden lg:col-span-12 grid lg:grid-cols-2 max-h-fit grid-cols-1 items-center">
            <div className='text-center my-auto'>
                <h1 className='text-6xl text-white capitalize'>careers</h1>
            </div>
            <div className='text-center my-auto'>
                <img src="hir.png" alt="" />
            </div>
          </div>
          <div className='bg-white lg:col-span-6'>
            {isLoading ? (<AiOutlineHourglass className='text-black mx-auto text-4xl animate-spin' />) : (
              <div className='p-5'>
                <h1 className='capitalize lg:text-4xl bg-gradient-to-r from-[#1cda7b] to-[#0c7482] w-fit inline-block text-transparent bg-clip-text font-semibold px-2 py-1 '>available vacancies</h1>
                {data &&  data.map((e)=>(
                  <div key={e.id} className="py-5 group items-center">
                    <h1 className='bg-gradient-to-l from-[#1cda7b] to-[#0c7482] py-5 text-2xl text-white px-2 capitalize rounded-lg'>{e.nameEn}</h1>

                    <div className='rounded-lg mt-2 space-y-3 decoration-clone hidden  group-hover:block transform transition duration-500 bg-gradient-to-l from-[#1cda7b] to-[#0c7482]  text-white  '>
                      <h1 className='px-4 text-xl '><span className='white capitalize text-2xl block'>desccreption</span>{e.descriptionEn}</h1>
                      <h1 className='px-4 text-xl'><span className='white capitalize text-2xl block'> location</span>{e.locationEn}</h1>
                      <h1 className='px-4 text-xl'><span className='white capitalize text-2xl block'> requirments</span>{e.requirmentEn}</h1>
                      <h1 className='px-4 text-xl'><span className='white capitalize text-2xl block'> what will you do</span>{e.whatYouWillDo}</h1>
                    </div>
                  
                  
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='bg-white lg:col-span-6 py-5 text-2xl'>
            <form action="" className='grid lg:grid-cols-1 gap-1 mx-auto w-fit'>
              <h1 className='capitalize lg:text-4xl text-xl bg-gradient-to-r from-[#1cda7b] to-[#0c7482] w-fit inline-block text-transparent bg-clip-text font-semibold'>join us now</h1>
              <input type="text" placeholder='Full Name' className='p-3 outline-none focus:border-2 focus:border-[#1cda7b] rounded-lg border-2' required />
              <input type="text" placeholder='Email Address'className='p-3 outline-none focus:border-2 focus:border-[#1cda7b] rounded-lg border-2' required />
              <input type="text" placeholder='Mobile Number'className='p-3 outline-none focus:border-2 focus:border-[#1cda7b] rounded-lg border-2' required/>
              <input type="text" placeholder='Address'className='p-3 outline-none focus:border-2 focus:border-[#1cda7b] rounded-lg border-2' required />
              <label htmlFor="">
                <input type="file" className='p-3 outline-none focus:border-2 focus:border-[#1cda7b] rounded-lg border-2'/>
              </label>
              <select name="" id="" className='p-3 outline-none focus:border-2 focus:border-[#1cda7b] rounded-lg border-2' required>
                <option value="" className='p-3 outline-none focus:border-2 focus:border-[#1cda7b] rounded-lg border-2'>select postion</option>
                  {data && (
                    data.map((e)=>(
                      <option value={e.nameEn} key={e.id}>{e.nameEn}</option>
                    ))
                  )}
              </select>
              <textarea name="cover letter" id="" cols="2" rows="5" placeholder='Cover letter' className='p-3 outline-none focus:border-2 focus:border-[#1cda7b] rounded-lg border-2'></textarea>
              <input type="submit" value={"Send"} className='bg-gradient-to-l from-[#1cda7b] to-[#0c7482] text-white text-3xl py-2 rounded-lg cursor-pointer hover:bg-gradient-to-r' />
            </form>
          </div> */}
        </section>
        <Footer />
    </div>
  )
}

export default Webcareer