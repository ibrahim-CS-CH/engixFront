import React, { useEffect, useState } from "react";
import { useFetch } from "./Landing";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiOutlineHourglass } from "react-icons/ai";
import { TbPoint } from 'react-icons/tb'
const Clients = () => {
  const [slider, setSlider] = useState(0);
  const [realData, setRealData] = useState([]);
  const { data, isLoading } = useFetch("http://127.0.0.1:8000/api/ourclients");
  const slide = data && [...Array(Math.ceil(data.length / 6)).keys() ];
  useEffect(()=>{
    const fetchData = async()=>{
      const fetchData = await fetch('http://127.0.0.1:8000/api/ourclients');
      const json = await fetchData.json();
      setRealData(json.slice(slider,slider+6))
    }
    fetchData();
  },[slider]);
  const handleSlide = (e)=>{
    e.preventDefault();
    if(+e.target.id === 0){
      setSlider(0);
    }
    else if (+e.target.id === 1) {
      setSlider(6);
    }
    else if(+e.target.id === 2) {
      setSlider(12);
    }else if (+e.target.id ===3) {
      setSlider(18);
    }
  }
  return (
    <section className="text-center flex items-center">
      <div className="grid lg:grid-cols-12  text-white capitalize h-fit items-center   ">
        <div className=" text-black text-center lg:text-7xl font-semibold   lg:col-span-2 lg:col-start-2 uppercase">
          <span className="text-[#1cda7b]">our</span> <h1>client</h1>{" "}
          <div className="mt-10 underline h-1 bg-[#1cda7b] w-28"></div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 grid grid-cols-3">
          {isLoading ? (
            <AiOutlineHourglass className="text-black mx-auto text-4xl animate-spin" />
          ) : (
            realData && realData.slice(0,18).map((e) => (
              <div className="p-3 group relative" key={e.id}>
                <LazyLoadImage
                  src={e.image}
                  alt={e.nameEn}
                  className="w-48 h-48 "
                />
                <div className="bg-[url('background.png')] bg-contain absolute top-6 w-40 m-2 h-40 text-center  group-hover:block opacity-0 group-hover:opacity-70 transition-opacity duration-500 ease-linear">
                  <span className="text-white  font-semibold h-fit inline-block my-16 ">
                    {e.nameEn}
                  </span>
                </div>
              </div>
            ))
          )}
            <div className="flex space-x-5  mx-auto lg:col-span-3 font-bold">
              {slide && slide.slice(0,4).map((e, i) => <button className="hover:text-[#1cda7b]" onClick={handleSlide} id={i} key={i}>O</button>)}
            </div>
        </div>
      </div>
    </section>
  );
};
export default Clients;