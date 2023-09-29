import React from 'react'
const Shared = () => {
  return (
    <div className='bg-[#fff] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:py-20 py-6  '>
        <h1 className='px-2 lg:ml-16 lg:col-span-12 lg:text-4xl text-xl capitalize bg-gradient-to-r from-[#1cda7b] to-[#0c7482] w-fit inline-block text-transparent bg-clip-text font-semibold '>request business automation & intelligence now</h1>
        <div className='lg:col-span-6  space-y-8 lg:ml-20'>
            <input type="text" className='py-3 border-2 block text-2xl px-3 mx-auto w-5/6  lg:w-full  outline-none focus:border-2 focus:border-[#1cda7b] rounded-lg '  placeholder='Full Name'/>
            <input type="text" className='py-3 border-2 block  text-2xl px-3 mx-auto w-5/6  lg:w-full   outline-none focus:border-2 focus:border-[#1cda7b] rounded-lg '  placeholder='Email Address'/>
            <input type="text" className='py-3 border-2 block  text-2xl px-3 mx-auto w-5/6 lg:w-full    outline-none focus:border-2 focus:border-[#1cda7b] rounded-lg '  placeholder='Mobile Number'/>
            <input type="text" className='py-3 border-2 block text-2xl px-3  mx-auto w-5/6  lg:w-full  outline-none focus:border-2 focus:border-[#1cda7b] rounded-lg '  placeholder='Company Name'/>
        </div>
        <div className='lg:col-span-6 space-y-6 lg:mr-20'>
            <textarea name="" id="" cols="30" rows="7" className='mx-auto w-5/6 lg:w-full py-3 border-2 block  text-2xl px-3 outline-none focus:border-2 focus:border-[#1cda7b]  rounded-lg' placeholder='Message '></textarea>
            <input type="submit" value={'get a quote'} className="capitalize text-center py-3 w-full bg-[#15a45c] text-2xl text-white rounded-lg cursor-pointer hover:bg-[#0c7482] duration-500 transition-colors ease-in-out" />
        </div>
    </div>
  )
}

export default Shared