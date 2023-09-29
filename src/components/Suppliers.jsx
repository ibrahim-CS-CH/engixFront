import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useSupplier from '../hooks/useSuppliers'
import Swal from 'sweetalert2';
export const AddSupplier = ()=>{
  const navigate = useNavigate();
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
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
  const handleSubmit = async(event) =>{
    event.preventDefault();
   
    const formData = new FormData();
    formData.append('nameAr', nameAr);
    formData.append('nameEn', nameEn);
    formData.append('image', image);

    if (!nameAr || !nameEn || !image) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'please make sure to enter new supplier'
      })
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/suppliers/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Reset the form after successful submission
        setNameAr('');
        setNameEn('');
        setImage(null);
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'added new supplier successfully',
          showConfirmButton: false,
          timer: 1000
        });
        navigate("/suppliers");
        window.location.reload();
        // Add success handling logic here
      } else {
        // Handle error responses
        console.error('Failed to create supplier');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div className="m-5">
    <Link
      className="bg-[#0d6992] rounded-md px-1 py-1 text-white hover:bg-[#07384e]"
      to={"/suppliers"}>
      supplier
    </Link>
    <form
      onSubmit={handleSubmit}
      className="space-y-3 p-3 bg-gray-100  rounded-lg mt-3 capitalize w-3/4 ">
      <h1 className="font-semibold text-3xl">add new supplier</h1>
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
  )
}
const Suppliers = () => {
  const {data, setData} = useSupplier();
  console.log(data);
  const handleDeleteClient = async (clientId) => {
    try {
      // Send an HTTP DELETE request to the API endpoint
      const response = await fetch(`http://127.0.0.1:8000/api/suppliers/destroy/${clientId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If the deletion was successful, update the client list
        const updatedClients = data.filter((client) => client.id !== clientId);
        setData(updatedClients);
        console.log("delted");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'deleted successfully',
          showConfirmButton: false,
          timer: 1000
        })
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
    <div className='space-y-6 p-3 bg-gray-100 m-5 rounded-lg '>
      <div>
        <h1 className='font-semibold text-3xl'>Suppliers</h1>
      </div>
      <div >
        <Link className='bg-[#0d6992] rounded-md px-1 py-1 text-white hover:bg-[#07384e]' to="/addsupplier">add new supplier</Link>
      </div>
      <div>
      <table className='bg-[#0d6992] text-white capitalize w-3/4 '>
          <thead>
            <tr className=''>
              <td className='border-2 border-white px-2'>id</td>
              <td className='border-2 border-white px-2'>name</td>
              <td className='border-2 border-white px-2'>image</td>
              <td className='border-2 border-white px-2'>actions</td>
            </tr>
          </thead>
          <tbody>
            {data.map((e, i)=>(
              <tr key={e.id}>
                <td className='border-2 border-white px-2 py-1'>{i+1}</td>
                <td className='border-2 border-white px-2 py-1'>{e.nameEn}</td>
                <td className='border-2 border-white px-2 py-1'><img src={e.image} alt="" className='w-32' /></td>
                <td className='border-2 border-white px-2 space-x-3'>
                  {/* <Link className='bg-yellow-500 hover:bg-yellow-700 rounded-md px-1 my-1'>edit</Link> */}
                  <button className='bg-red-500 rounded-md px-1 hover:bg-red-700' onClick={() => handleDeleteClient(e.id)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Suppliers