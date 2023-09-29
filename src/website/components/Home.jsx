import React from 'react'
import   { Tnavbar } from './Navbar';
import Landing from './Landing';
import Footer from "./Footer"
import AboutUs from './AboutUs';
import Services from './Services';
import Clients from './Clients';
import Suppliers from './Suppliers';
import Products from './Products';
import Contactus from './Contactus';
import { Scroll } from './Scroll';
const Home = () => {
  return (
    <div className="bg-[url('../../background.png')] font-real">
        <Tnavbar />
        <Landing />
        <AboutUs />
        <Services />
        <Clients />
        <Suppliers />
        <Contactus />
        <Footer />
        <Scroll />
    </div>
  )
}

export default Home