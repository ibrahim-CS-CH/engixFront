import React, { useState } from 'react'
import useSlider from '../hooks/useSlider'
import {Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';
const Slider = () => {
  const { data } = useSlider();
  const handleDeleteSlide = async (slideId) => {
    try {
      // Send an HTTP DELETE request to the API endpoint
      const response = await fetch(
        `http://127.0.0.1:8000/api/sliders/destroy/${slideId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("delted");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "deleted successfully",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        // Handle error responses here
        console.error("Failed to delete client");
      }
    } catch (error) {
      // Handle network errors here
      console.error("Network error:", error);
    }
  };
  return (
    <div>
      <div>
        <h1 className="font-semibold text-3xl">sliders</h1>
      </div>{" "}
      <div className="space-x-8 my-5">
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 whitespace-normal text-white hover:bg-[#07384e]"
          to="/addslider">
          add new slider
        </Link>
      
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Name (Arabic)
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Name (English)
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Description (Arabic)
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Description (English)
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data &&
              data.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.nameAr}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.nameEn}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.descriptionAr}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.descriptionEn}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <img
                      src={item.image}
                      alt={`Image for ${item.nameEn}`}
                      className="h-16 w-16 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <button
                      className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                      onClick={() => handleDeleteSlide(item.id)}>
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
}
export const AddSlider = ()=>{
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      formDataToSend.append('nameAr', formData.nameAr);
      formDataToSend.append('nameEn', formData.nameEn);
      formDataToSend.append('descriptionAr', formData.descriptionAr);
      formDataToSend.append('descriptionEn', formData.descriptionEn);
      formDataToSend.append('image', formData.image);

      // Replace 'your-api-endpoint' with your actual API endpoint
      const response = await fetch('http://localhost:8000/api/sliders/create', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        console.log('Data submitted successfully!');
        navigate("/slider");
        
      } else {
        // Handle errors, e.g., show an error message
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-5xl  p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Data Form</h2>
      <form onSubmit={handleSubmit}>
        <div className='lg:flex lg:space-x-8  '>
          {/* nameAr */}
          <div className="mb-4 w-full">
            <label htmlFor="nameAr" className="block text-gray-700 font-medium">
              Name (Arabic):
            </label>
            <input
              type="text"
              id="nameAr"
              name="nameAr"
              placeholder="Enter name in Arabic"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.nameAr}
              onChange={handleChange}
              required
            />
          </div>

          {/* nameEn */}
          <div className="mb-4 w-full">
            <label htmlFor="nameEn" className="block text-gray-700 font-medium">
              Name (English):
            </label>
            <input
              type="text"
              id="nameEn"
              name="nameEn"
              placeholder="Enter name in English"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.nameEn}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className='lg:flex lg:space-x-8  '>

        {/* descriptionAr */}
        <div className="mb-4  w-full">
          <label htmlFor="descriptionAr" className="block text-gray-700 font-medium">
            Description (Arabic):
          </label>
          <textarea
            id="descriptionAr"
            name="descriptionAr"
            rows="4"
            placeholder="Enter description in Arabic"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={formData.descriptionAr}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* descriptionEn */}
        <div className="mb-4 w-full">
          <label htmlFor="descriptionEn" className="block text-gray-700 font-medium">
            Description (English):
          </label>
          <textarea
            id="descriptionEn"
            name="descriptionEn"
            rows="4"
            placeholder="Enter description in English"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={formData.descriptionEn}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        </div>

        {/* Image */}
        <div className="mb-4 w-full">
          <label htmlFor="image" className="block text-gray-700 font-medium">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            onChange={handleChange}
            required
          />
        </div>

        <div className='lg:flex  justify-center lg:space-x-8 '>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Submit
          </button>
          <Link 
            to={-1}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          > 
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Slider