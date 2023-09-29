import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='bg-[#0d6992] space-y-4 capitalize text-white px-2 h-screen '>
      <Link to={"products"} className="block">products</Link>
      <Link to={"categories"} className="block">categories</Link>
      <Link to={"suppliers"} className="block">suppliers</Link>
      <Link to={"slider"} className="block">slider</Link>
      <Link to={"aboutUs"} className="block">about us</Link>
      <Link to={"clients"} className="block">clients</Link>
      <Link to={"contactus"} className="block">contact us</Link>
      <Link to={"offers"} className="block">offers</Link>
      <Link to={"ourWorks"} className="block">our works</Link>
      <Link to={"careers"} className="block">careers</Link>
      <Link to={"orders"} className="block">orders</Link>
      <Link to={"program"} className="block">program</Link>     
      <Link to={"social"} className="block">social media</Link>     
    </div>
  )
}
export default Sidebar