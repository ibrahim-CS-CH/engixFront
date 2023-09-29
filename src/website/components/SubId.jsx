import React, { useEffect, useState } from 'react'
import Shared from './Shared'
import { useParams } from 'react-router-dom'
import { useFetch } from './Landing';
import { Tnavbar } from './Navbar';
import Footer from './Footer';
import { AiOutlineHourglass } from 'react-icons/ai';
import { Scroll } from './Scroll';
const SubId = () => {

    const { subId } = useParams();
    const [data, setX] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/subcats/${subId}`);
            const json = await response.json();
            setX(json)
        } catch (error) {
            console.log("error", error);
        }
        }
        fetchData();
        
    },[subId])
    const [product, setProduct] = useState(null);
    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/products').then((res)=>res.json()).then((data)=>setProduct(data))
    },[subId]);
    const myProducts = product && product.filter((e)=>e.sub_category_id == subId);

  return (
    <div className="bg-[url('../../../public/background.png')]">
        <Tnavbar />
        <section className='font-real'>
            <div className="grid lg:grid-cols-6 py-7 px-12 items-center space-y-8">
                    <h1 className='text-white text-2xl font-semibold lg:text-4xl lg:col-span-2 lg:col-start-2'>{data.subCategoryEn}</h1>
                    <img src={data.image} alt="" className='lg:col-span-2 lg:h-[60vh]' />
                </div>
            <div >
                {myProducts && (
                    myProducts.map((e, i)=>(
                        i % 2 == 0 ? ( 
                        <div key={e.id} className="lg:col-span-12 bg-white lg:grid lg:grid-cols-12 gap-8 items-center py-5 capitalize border-b-2">
                            <div className='lg:col-span-5 lg:col-start-2 mx-auto space-y-4'>
                                <h1 className='lg:text-4xl text-2xl font-semibold'>{e.nameEn}</h1>
                                <p>{e.descriptionEn}</p>
                            </div>
                            {e.images.map((x, i)=>(
                                i == 0 && <img src={x.image} alt="" key={x.id} className="lg:col-span-5 py-2" />
                            ))}
                        </div>
                    ):(
                        <div key={e.id} className="lg:col-span-12 bg-white lg:grid lg:grid-cols-12 items-center gap-8 py-5 capitalize border-b-2">
                            {e.images.map((x, i)=>(
                                i == 0 && <img src={x.image} alt="" key={x.id} className="lg:col-span-5 lg:col-start-2 py-2" />
                            ))}
                            <div className=' lg:col-span-5 space-y-4'>
                                <h1 className='lg:text-4xl text-2xl font-semibold'>{e.nameEn}</h1>
                                <p>{e.descriptionEn}</p>
                            </div>
                        </div>
                    )
                    ))
                )}
            </div>
        </section>
        
        <Shared />
        <Scroll />

<Footer />
    </div>
  )
}

export default SubId