import React from 'react'
import { Tnavbar } from './Navbar'
import Footer from './Footer'
import { useFetch } from './Landing'
import AboutUs from './AboutUs'
import Contactus from './Contactus'

const WebAboutus = () => {
    
  return (
    <div className="bg-[url('background.png')]">
        <Tnavbar />
          <section className='grid lg:grid-cols-12'>
            <div className='lg:col-span-12'>
              <AboutUs />
            </div>
            <div className='lg:col-span-12'>
              <Contactus />
            </div>
          </section>
        <Footer />

    </div>
  )
}

export default WebAboutus