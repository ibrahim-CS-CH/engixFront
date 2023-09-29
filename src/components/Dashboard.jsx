import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
const Dashboard = () => {
  
  return (
    
    <div className='text-2xl grid grid-cols-8'>
      <section className='col-span-8'>
        <Navbar />
      </section>
      <section className='col-span-1'>
        <Sidebar />
      </section>
      <section className='col-span-7'>
          <Outlet />
      </section>
    </div>
  )
}

export default Dashboard