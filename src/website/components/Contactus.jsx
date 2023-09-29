import React from "react";
import { AiOutlineHourglass } from "react-icons/ai";
import { useFetch } from "./Landing";

const Contactus = () => {
  const { data, isLoading } = useFetch("http://127.0.0.1:8000/api/contactus");
  return (
    <section className="grid lg:grid-cols-12 my-20 ">
      <div className="lg:col-start-2 lg:col-span-4 text-7xl uppercase">
        <span className="text-[#1cda7b] block">get</span>
        <h1>in touch</h1>
        <div className="mt-10 underline h-1 bg-[#1cda7b] w-28"></div>
        <div>
          {isLoading ? (
            <AiOutlineHourglass className="text-black mx-auto text-4xl animate-spin" />
          ) : (
            data.map((e) => (
              <div key={e.id} className="capitalize text-2xl mt-5">
                <h1 className="uppercase text-[#1cda7b]">monofia branch:</h1>
                <h1 className="text-gray-800 text-xl">
                  <span className="text-white uppercase ">mobile: </span>
                  {e.phone}
                </h1>
                <h1 className="text-gray-800 text-xl">
                  <span className="text-white uppercase ">tel: </span>
                  {e.tel}
                </h1>
                <h1 className="text-gray-800 text-xl mt-10">
                  <span className="text-[#1cda7b] uppercase block ">
                    email:{" "}
                  </span>
                  {e.email}
                </h1>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="lg:col-span-6 bg-[#0b0423]">
        <form action="" className=" grid lg:grid-cols-1">
          <label htmlFor="name" className="uppercase py-2">
            <input
              type="text"
              placeholder="Name"
              className="bg-[#0b0423] text-white border-b-2 border-b-white px-2 text-lg w-full h-10  outline-none focus:border-b-[#1cda7b] focus:border-b-2 duration-500 transition transform"
            />
          </label>
          <label htmlFor="email" className="py-2">
            <input
              type="text"
              placeholder="Email"
              className="bg-[#0b0423] text-white border-b-2 border-b-white px-2 text-lg w-full h-10 outline-none focus:border-b-[#1cda7b] focus:border-b-2 duration-500 transition transform"
            />
          </label>
          <label htmlFor="moblie" className="py-2">
            <input
              type="text"
              placeholder="Moblie"
              className="bg-[#0b0423] text-white border-b-2 border-b-white px-2 text-lg w-full h-10 outline-none focus:border-b-[#1cda7b] focus:border-b-2 duration-500 transition transform"
            />
          </label>
          <label htmlFor="subject" className="py-2">
            <input
              type="text"
              placeholder="Subject"
              className="bg-[#0b0423] text-white border-b-2 border-b-white px-2 text-lg w-full h-10 outline-none focus:border-b-[#1cda7b] focus:border-b-2 duration-500 transition transform"
            />
          </label>
          <label htmlFor="message" className="py-2 ">
            <textarea
              name="message"
              id=""
              cols="125"
              rows="5"
              className="bg-[#0b0423] text-white border-b-2 border-b-white px-2 text-lg w-full  outline-none focus:border-b-[#1cda7b] focus:border-b-2 ease-in-out duration-500 transition transform"
              placeholder="Message"></textarea>
          </label>
          <div className="text-end">
            <input
              type="submit"
              value={"Send"}
              className="mr-2 mb-2 hover:bg-[#0b0423] transform transition duration-500 ease-in-out bg-[#1cda7b] text-white rounded-lg px-4 py-1 h-10 text-lg w-fit"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contactus;
