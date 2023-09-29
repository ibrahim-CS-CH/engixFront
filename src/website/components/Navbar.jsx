import React, { useEffect, useState } from "react";
import { NavLink, Link, Navigate } from "react-router-dom";
import Getquate from "./Getquate";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { useFetch } from "./Landing";
const localCache = {};
export const Tnavbar = () => {
  const [open, setOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
  const { data } = useFetch("http://127.0.0.1:8000/api/categories");
  const fetchProgram = async()=>{
    const fetchData = await fetch('http://127.0.0.1:8000/api/SubCategoryProgram');
    const json = await fetchData.json();
    localCache["programs"] = json || [];
    setPrograms(localCache["programs"]);
  }
  useEffect(()=>{
    if (localCache["programs"]) {
      setPrograms(localCache["programs"])
    }else {
      fetchProgram();
    }
  }, []);  
  const serve = data && data.filter((e)=>e.prand =="Services");
  return (
    <div className="sticky top-0  font-real text-2xl z-50 h-fit md:bg-[url('../../background.png')]">
      <div className="flex items-center font-real w-full">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between">
          <Link to={"/home"}>
            <img src="/another.png" alt="logo" className="h-8" />
          </Link>
          <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
            {open ? <AiOutlineClose /> : <FaBars />}
          </div>
        </div>
        <ul className="md:flex hidden capitalize items-center gap-8 font-real ml-24 ">
          <div className="px-3  flex gap-8 w-full ">
          <Link
              className="group py-7 md:cursor-pointer text-lg hover:text-[#1cda7b] uppercase"
              to={"/about"}>
              <span className="opacity-0 relative left-3 group-hover:-left-2 group-hover:opacity-100 duration-300">
                [
              </span>
              <span>about us</span>
              <span className="opacity-0 relative right-3 group-hover:-right-2 group-hover:opacity-100 duration-300">
                ]
              </span>
            </Link>
            <div className="py-7 group text-lg  hover:text-[#1cda7b]">
              <Link className="cursor-pointer uppercase group " to={"/serve"}>
                <span className="opacity-0 relative left-3 group-hover:-left-2 group-hover:opacity-100 duration-300">
                  [
                </span>
                <span>services</span>
                <span className="opacity-0 relative right-3 group-hover:-right-2 group-hover:opacity-100 duration-300">
                  ]
                </span>
              </Link>
              {data && (
                <div>
                  <div className="absolute mr-14  top-20 hidden group-hover:md:block transform transition ease-out duration-300 text-lg ">
                    <div className="py-3">
                      <div className="w-4 h-4 left-7 absolute mt-1 bg-white rotate-45"></div>
                    </div>
                    <div className={`bg-white p-5 grid grid-cols-5 gap-10 `}>
                      {serve.slice(0,5).map((e, i) => (
                        <div
                          key={e.id}
                          className={`${
                            i != 4 ? "border-r-2 " : " border-none"
                          }px-1 `}>
                          <Link
                            to={`/serve/${e.id}`}
                            className="hover:text-[#1cda7b] cursor-pointer font-semibold underline">
                            {e.categoryNameEn}
                          </Link>
                          {e.sub_category.map((x) => (
                            <li
                              className=" text-gray-600 my-2.5 hover:text-[#1cda7b] cursor-pointer font-real text-lg"
                              key={x.id}>
                              <NavLink to={`/serve/${e.id}/${x.id}`}>
                                {x.subCategoryEn}
                              </NavLink>
                            </li>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="py-7 group text-lg  hover:text-[#1cda7b]">
              <Link className="cursor-pointer uppercase group " to={"/programs"}>
                <span className="opacity-0 relative left-3 group-hover:-left-2 group-hover:opacity-100 duration-300">
                  [
                </span>
                <span>programs</span>
                <span className="opacity-0 relative right-3 group-hover:-right-2 group-hover:opacity-100 duration-300">
                  ]
                </span>
              </Link>
              {data && (
                <div>
                  <div className="absolute mr-14  top-20 hidden group-hover:md:block transform transition ease-out duration-300 text-lg ">
                    <div className="py-3">
                      <div className="w-4 h-4 left-7 absolute mt-1 bg-white rotate-45"></div>
                    </div>
                    <div className={`bg-white p-5 grid grid-cols-5 gap-10 `}>
                      {programs && programs.slice(0,5).map((e, i) => (
                        <div
                          key={e.id}
                          className={`${
                            i != 4 ? "border-r-2 " : " border-none"
                          }px-1 `}>
                          <Link
                            to={`/programs`}
                            className="hover:text-[#1cda7b] cursor-pointer font-semibold underline">
                            {e.subCategoryEn}
                          </Link>
                          {e.program.map((x) => (
                            <li
                              className=" text-gray-600 my-2.5 hover:text-[#1cda7b] cursor-pointer font-real text-lg"
                              key={x.id}>
                              <NavLink to={`/programs/${x.id}`}>
                                {x.nameProgramEn}
                              </NavLink>
                            </li>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link
              className="group py-7 md:cursor-pointer text-lg hover:text-[#1cda7b] uppercase "
              to={"/product"}>
              <span className="opacity-0 relative left-3 group-hover:-left-2 group-hover:opacity-100 duration-300">
                [
              </span>
              <span>products</span>
              <span className="opacity-0 relative right-3 group-hover:-right-2 group-hover:opacity-100 duration-300">
                ]
              </span>
            </Link>
            
            <Link
              className="group py-7 md:cursor-pointer text-lg hover:text-[#1cda7b] uppercase"
              to={"/blog"}>
              <span className="opacity-0 relative left-3 group-hover:-left-2 group-hover:opacity-100 duration-300">
                [
              </span>
              <span>blog</span>
              <span className="opacity-0 relative right-3 group-hover:-right-2 group-hover:opacity-100 duration-300">
                ]
              </span>
            </Link>
            <Link
              className="group py-7 md:cursor-pointer text-lg hover:text-[#1cda7b] uppercase"
              to={"/career"}>
              <span className="opacity-0 relative left-3 group-hover:-left-2 group-hover:opacity-100 duration-300">
                [
              </span>
              <span>career</span>
              <span className="opacity-0 relative right-3 group-hover:-right-2 group-hover:opacity-100 duration-300">
                ]
              </span>
            </Link>
            <Link
              className="group py-7 md:cursor-pointer text-lg hover:text-[#1cda7b] uppercase"
              to={"/offer"}>
              <span className="opacity-0 relative left-3 group-hover:-left-2 group-hover:opacity-100 duration-300">
                [
              </span>
              <span>offer</span>
              <span className="opacity-0 relative right-3 group-hover:-right-2 group-hover:opacity-100 duration-300">
                ]
              </span>
            </Link>
            <Link
              className="group py-7 md:cursor-pointer text-lg hover:text-[#1cda7b] uppercase"
              to={"/ourwork"}>
              <span className="opacity-0 relative left-3 group-hover:-left-2 group-hover:opacity-100 duration-300">
                [
              </span>
              <span>our work</span>
              <span className="opacity-0 relative right-3 group-hover:-right-2 group-hover:opacity-100 duration-300">
                ]
              </span>
            </Link>
            <Link
              className="group py-7 md:cursor-pointer text-lg hover:text-[#1cda7b] uppercase flex"
              to={"/cart"}>
              <span className="opacity-0 relative left-3 group-hover:-left-2 group-hover:opacity-100 duration-300">
                [
              </span>
              <span>cart </span><AiOutlineShoppingCart className="my-auto ml-1" />
              <span className="opacity-0 relative right-3 group-hover:-right-2 group-hover:opacity-100 duration-300">
                ]
              </span>
            </Link>
          </div>
        </ul>
        <ul
          className={`md:hidden absolute bg-white w-full h-full bottom-0 py-24 pl-4 duration-500 ${
            open ? "left-0" : "left-[-100%]"
          }`}>
          <div className="space-y-12">
            <Link className="px-3 text-left block">services</Link>
            <Link className="px-3 text-left block">about us</Link>
            <Link className="px-3 text-left block">blog</Link>
            <Link className="px-3 text-left block">career</Link>
            <Link className="px-3 text-left block">offers</Link>
          </div>
          <div className="py-5">
            <Getquate />
          </div>
        </ul>
      </div>
    </div>
  );
};
