import React, { useEffect, useState } from "react";
import useClients from "../hooks/useClients";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../website/components/Landing";
import Swal from "sweetalert2";
const BASE_URL = "http://127.0.0.1:8000/api/";
const Clients = () => {
  const {
    data: { data, error, isLoading },
  } = useFetch("http://localhost:8000/api/ourclients");
  
  console.log(data);
  const handleDeleteClient = async (clientId) => {
    try {
      // Send an HTTP DELETE request to the API endpoint
      const response = await fetch(`http://127.0.0.1:8000/api/ourclients/destroy/${clientId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If the deletion was successful, update the client list
        const updatedClients = data.filter((client) => client.id !== clientId);
        
        console.log("delted");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'deleted successfully',
          showConfirmButton: false,
          timer: 1000
        });
        window.location.reload()
      } else {
        // Handle error responses here
        console.error('Failed to delete client');
      }
    } catch (error) {
      // Handle network errors here
      console.error('Network error:', error);
    }
  };

  return (
    <div className="space-y-6 p-3 bg-gray-100 m-5 rounded-lg ">
      <div>
        <h1 className="font-semibold text-3xl">clients</h1>
      </div>
      <div>
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 text-white hover:bg-[#07384e]"
          to="/addclient">
          add new client
        </Link>
      </div>
      <div>
        <table className="bg-[#0d6992] text-white capitalize w-3/4 ">
          <thead>
            <tr className="">
              <td className="border-2 border-white px-2">id</td>
              <td className="border-2 border-white px-2">name</td>
              <td className="border-2 border-white px-2">image</td>
              <td className="border-2 border-white px-2">actions</td>
            </tr>
          </thead>
          <tbody>
            {data && data.map((e, i) => (
              <tr key={e.id}>
                <td className="border-2 border-white px-2 py-1">{i + 1}</td>
                <td className="border-2 border-white px-2 py-1">{e.nameEn}</td>
                <td className="border-2 border-white px-2 py-1">
                  <img src={e.image} alt="" className="w-32" />
                </td>
                <td className="border-2 border-white px-2 space-x-3">
                 
                  <button className="bg-red-500 rounded-md px-1 hover:bg-red-700" onClick={() => handleDeleteClient(e.id)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
      </div>
    </div>
  );
};
export const AddClient = () => {
  const navigate = useNavigate();

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [image, setImage] = useState(null);

  const handleNameArChange = (event) => {
    setNameAr(event.target.value);
  };

  const handleNameEnChange = (event) => {
    setNameEn(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nameAr", nameAr);
    formData.append("nameEn", nameEn);
    formData.append("image", image);
    if (!nameAr || !nameEn || !image) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'please make sure to enter new client'
      })
      return;
    }
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/ourclients/create",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // Reset the form after successful submission
        setNameAr("");
        setNameEn("");
        setImage(null);
        console.log(response);
        console.log("added successfully");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'added new client successfully',
          showConfirmButton: false,
          timer: 1000
        });
        navigate("/clients");
        window.location.reload();

        // Add success handling logic here
      } else {
        // Handle error responses
        console.error("Failed to create client");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="m-5">
      <Link
        className="bg-[#0d6992] rounded-md px-1 py-1 text-white hover:bg-[#07384e]"
        to={"/clients"}>
        clients
      </Link>
      <form
        onSubmit={handleSubmit}
        className="space-y-3 p-3 bg-gray-100  rounded-lg mt-3 capitalize w-3/4 ">
        <h1 className="font-semibold text-3xl">add new client</h1>
        <div className="grid grid-cols-2 items-center gap-8 ">
          <label htmlFor="nameEN">
            nameEN
            <input
              value={nameEn}
              onChange={handleNameEnChange}
              type="text"
              placeholder="nameEN"
              id="nameEN"
              className="mx-2 border border-black rounded-md py-1 px-5"
            />
          </label>
          <label htmlFor="nameAr" className="flex">
          nameAr
          <input
              value={nameAr}
              onChange={handleNameArChange}
              type="text"
              placeholder="الإسم"
              id="nameAr"
              className="mx-2 border border-black rounded-md py-1 px-5"
            />
            
          </label>

          <label htmlFor="images" className="flex ">
            images
            <input
              onChange={handleImageChange}
              type="file"
              id="images"
              name="images"
              accept="image/*"
              className="mx-2"
            />
          </label>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="border border-black rounded-lg p-2 hover:bg-red-500 duration-300 hover:border-white hover:text-white" type="submit">
            submit
          </button>
          <Link to={-1} className="border border-black rounded-lg p-2  hover:bg-orange-500 duration-300 hover:border-white hover:text-white">cancel</Link>
        </div>
      </form>
    </div>
  );
};

export const EditClient = () => {
  // const [data, setData] = useState(null);
  const { id } = useParams();

  // useEffect(()=>{
  //   const fetchData = async () => {
  //     await fetch(`http://127.0.0.1:8000/api/ourclients/${id}`,{
  //       method:"get"
  //     }).then((res)=>res.json()).then((data)=>setData(data)).catch((err)=>console.log(err))
  //   };
  //   fetchData()
  // }, [id]);
  // console.log(data);
  const { data, isLoading, error } = useFetch(
    `http://127.0.0.1:8000/api/ourclients/${id}`
  );
  // ourclients/id
  const [nameEn, setNameEn] = useState(data?.nameEn || "");
  const [nameAr, setNameAr] = useState(data?.nameAr || "");
  const [image, setImage] = useState(data?.image || "");
  console.log(nameEn, nameAr);

  return !data ? (
    <>isloading</>
  ) : (
    <div>
      <div className="m-5">
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 text-white hover:bg-[#07384e]"
          to={"/clients"}>
          clients
        </Link>
        <div className="space-y-3 p-3 bg-gray-100  rounded-lg mt-3 capitalize w-3/4">
          <h1 className="font-semibold text-3xl">Edit {data?.nameEn}</h1>
          <div className="grid lg:grid-cols-3 gap-y-12">
            <label htmlFor="name">
              name
              <input
                type="text"
                placeholder="name"
                id="nameEn"
                value={nameEn || data.nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                className="mx-2 border border-black rounded-md py-1 px-5"
              />
            </label>
            <label htmlFor="الإسم" className="">
              <input
                type="text"
                placeholder="الإسم"
                id="nameAr"
                value={nameAr || data?.nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                className="mx-2 border border-black rounded-md py-1 px-5"
              />
              الإسم
            </label>

            <label htmlFor="images" className="flex ">
              images
              <input
                type="file"
                id="images"
                name="images"
                accept="image/png, image/jpeg"
                className="mx-2"
                onChange={(e) => setImage(e.target.files)}
              />
            </label>
          </div>
          <div className="space-x-4 text-end">
            <button className="border rounded-lg p-2 hover:bg-red-400">
              save
            </button>
            <Link
              className="border rounded-lg p-2 hover:bg-orange-400"
              to={"/clients"}>
              cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
