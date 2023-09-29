import React, { useEffect, useState } from "react";
import { AiOutlineHourglass } from "react-icons/ai";
import { json, Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import { useFetch } from "./Landing";
import { Tnavbar } from "./Navbar";
import { Scroll } from "./Scroll";

const SubServices = () => {
  const { id } = useParams();
  const [data, setX] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/categories/${id}`);
        const json = await response.json();
        setX(json);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData();
    setX(json)
  },[id])
  return (
    <div>
      <Tnavbar />
      <section className="capitalize font-real  ">
        <div className="grid lg:grid-cols-12 items-center  lg:gap-0 gap-8 py-5 bg-[url('../../../public/background.png')]  ">
                <div className="lg:col-span-6 text-center">
                  <h1 className="lg:text-4xl text-2xl font-semibold text-white">
                    {data.categoryNameEn}
                  </h1>
                </div>
                <div className="lg:col-span-6 lg:m-0 mx-auto">
                  <img src={data.image} alt="" className="" />
                </div>
        </div>
        <>
          {data.sub_category ? (
            <div className="">
              {data.sub_category.map((e, i) => (
                <div key={e.id} className=" ">
                  {i % 2 == 0 ? (
                    <div className="grid lg:grid-cols-12 items-center border-b-2 py-8 gap-8">
                      <div className="lg:col-span-4 lg:col-start-2">
                        <img
                          src={e.image}
                          alt=""
                          className="lg:pl-5 lg:h-[70vh] lg:w-fit"
                        />
                      </div>
                      <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
                        <h1 className="text-2xl font-bold">
                          {e.subCategoryEn}
                        </h1>
                        <p className="text-xl">{e.desctriptionEn}</p>
                        <div className="flex space-x-4  text-xl justify-center lg:justify-start ">
                          <Link
                            className="bg-[#0b0423] rounded-lg hover:bg-[#1cda7b] text-white p-2 duration-300 transition-colors"
                            to={`${e.id}`}>
                            load more
                          </Link>
                          <Link className="bg-[#0b0423] rounded-lg hover:bg-[#1cda7b] text-white p-2 duration-300 transition-colors">
                            contact us
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid lg:grid-cols-12 items-center border-b-2 py-8 gap-8">
                      <div className="lg:col-span-6 lg:col-start-2 space-y-4">
                        <h1 className="text-2xl font-bold">
                          {e.subCategoryEn}
                        </h1>
                        <p className="text-xl">{e.desctriptionEn}</p>
                        <div className="flex space-x-4  text-xl justify-center lg:justify-start ">
                          <Link
                            className="bg-[#0b0423] rounded-lg hover:bg-[#1cda7b] text-white p-2 duration-300 transition-colors"
                            to={`${e.id}`}>
                            load more
                          </Link>
                          <Link className="bg-[#0b0423] rounded-lg hover:bg-[#1cda7b] text-white p-2 duration-300 transition-colors">
                            contact us
                          </Link>
                        </div>
                      </div>
                      <div className="lg:col-span-4 lg:col-start-8 space-y-4  ">
                        <img
                          src={e.image}
                          alt=""
                          className="lg:pl-5 lg:h-[70vh] lg:w-fit"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ):(<>loading</>)}
        </>
      </section>
      <Scroll />

      <Footer />
    </div>
  );
};

export default SubServices;
