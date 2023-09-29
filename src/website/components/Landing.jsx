import React, {useState, useEffect} from 'react'
import { AiOutlineHourglass } from 'react-icons/ai';
import { LazyLoadImage } from 'react-lazy-load-image-component';



export const useFetch = (url) => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Set isLoading to true before making the request
    setData((prevData) => ({
      ...prevData,
      isLoading: true,
    }));

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((responseData) => {
        if(responseData.message){
          setData([])
        }else 
          setData((prevData) => ({
            ...prevData,
            data: responseData,
            isLoading: false,
            error: null, // Clear any previous errors on success
          }));
      })
      .catch((error) => {
        setData((prevData) => ({
          ...prevData,
          isLoading: false,
          error: error, // Set the error state
        }));
      });
  }, [url]);

  return {
    data
  };
};
const Landing = () => {
  const {data, isLoading} = useFetch('http://127.0.0.1:8000/api/sliders')
  const [slider, setSlider] = useState(0);
  const handleClick = (e)=>{
    setSlider(+e.target.id)
  };

  useEffect(()=>{
    const timeout = setTimeout(() => {
      if(slider != 4 ){
        setSlider(slider +1)
      }else {
        setSlider(0)
      }
    }, 1000);
    return ()=>clearTimeout(timeout)
  },[slider])

  return (
    <div className=''>
      {isLoading? (<AiOutlineHourglass className='text-black mx-auto text-4xl animate-spin' />) : 
      (
        <div className='grid grid-cols-2 lg:grid-cols-12 h-fit '>
          <div className='lg:col-span-6 text-7xl text-center my-auto font-italic'>
            {data && data[slider].nameEn}
          </div>
          <div className="col-span-1 h-[70vh] lg:col-span-6">
            <LazyLoadImage src={data[slider].image} className="h-[70vh] overflow-hidden lg:w-full w-full bg-cover duration-500 "/>
          </div>
          <div className='col-span-12'>
            <p className='text-black w-fit space-x-8 mx-auto'>
                {data.map((e, i)=><button key={i} id={i} className='text-[#0b0423] hover:text-[#1cda7b] cursor-pointer text-3xl font-bold' onClick={handleClick}>____</button>)}
            </p></div>  
        </div>
        
      )}
    </div>
  )

}

export default Landing