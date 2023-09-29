import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../website/components/Landing';
import Swal from 'sweetalert2';

function AboutUs() {
  const [formData, setFormData] = useState({
    image: null,
    whoWeAreAr: '',
    whoWeAreEn: '',
    ourVisionAr: '',
    ourVisionEn: '',
    ourMissionAr: '',
    ourMissionEn: '',
    locationAr: '',
    locationEn: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Handle file input separately
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

      // Append the image file
      formDataToSend.append('image', formData.image);

      // Append the text inputs
      formDataToSend.append('whoWeAreAr', formData.whoWeAreAr);
      formDataToSend.append('whoWeAreEn', formData.whoWeAreEn);
      formDataToSend.append('ourVisionAr', formData.ourVisionAr);
      formDataToSend.append('ourVisionEn', formData.ourVisionEn);
      formDataToSend.append('ourMissionAr', formData.ourMissionAr);
      formDataToSend.append('ourMissionEn', formData.ourMissionEn);
      formDataToSend.append('locationAr', formData.locationAr);
      formDataToSend.append('locationEn', formData.locationEn);

      // Send formDataToSend to your API endpoint using fetch or Axios.
      const response = await fetch('http://127.0.0.1:8000/api/aboutus/create', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect.
        console.log('Data submitted successfully!');

      } else {
        // Handle errors, e.g., show an error message.
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-7xl p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Company Information</h2>
      <form onSubmit={handleSubmit}>
        <div className='lg:flex justify-center lg:space-x-8 w-[100%]'>
          {/* Text Inputs */}
          <div className="mb-4 w-full">
            <label htmlFor="whoWeAreAr" className="block text-gray-700 font-medium">
              Who We Are (Arabic):
            </label>
            <textarea
              id="whoWeAreAr"
              name="whoWeAreAr"
              rows="4"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.whoWeAreAr}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="whoWeAreEn" className="block text-gray-700 font-medium">
              Who We Are (English):
            </label>
            <textarea
              id="whoWeAreEn"
              name="whoWeAreEn"
              rows="4"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.whoWeAreEn}
              onChange={handleChange}
              required
            ></textarea>
          </div>

        </div>

        <div className='lg:flex justify-center lg:space-x-8 w-[100%]'>

          <div className="mb-4 w-full">
            <label htmlFor="ourVisionAr" className="block text-gray-700 font-medium">
              Our Vision (Arabic):
            </label>
            <textarea
              id="ourVisionAr"
              name="ourVisionAr"
              rows="4"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.ourVisionAr}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="ourVisionEn" className="block text-gray-700 font-medium">
              Our Vision (English):
            </label>
            <textarea
              id="ourVisionEn"
              name="ourVisionEn"
              rows="4"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.ourVisionEn}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
        <div className='lg:flex justify-center lg:space-x-8 w-[100%]'>
        <div className="mb-4 w-full">
          <label htmlFor="ourMissionAr" className="block text-gray-700 font-medium">
            Our Mission (Arabic):
          </label>
          <textarea
            id="ourMissionAr"
            name="ourMissionAr"
            rows="4"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={formData.ourMissionAr}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="ourMissionEn" className="block text-gray-700 font-medium">
            Our Mission (English):
          </label>
          <textarea
            id="ourMissionEn"
            name="ourMissionEn"
            rows="4"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={formData.ourMissionEn}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        </div>

        <div className='lg:flex justify-center lg:space-x-8 w-[100%]'>

        <div className="mb-4 w-full">
          <label htmlFor="locationAr" className="block text-gray-700 font-medium">
            Location (Arabic):
          </label>
          <input
            type="text"
            id="locationAr"
            name="locationAr"
            placeholder="Enter location in Arabic"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={formData.locationAr}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="locationEn" className="block text-gray-700 font-medium">
            Location (English):
          </label>
          <input
            type="text"
            id="locationEn"
            name="locationEn"
            placeholder="Enter location in English"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={formData.locationEn}
            onChange={handleChange}
            required
          />
        </div>
        </div>
        {/* Image */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-medium">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="w-full mt-1"
            onChange={handleChange}
            required
          />
        </div>
     
        <div className='lg:flex justify-center lg:space-x-8 w-[100%]'>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Submit
        </button>
        <Link
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"

        to={-1}> Cancel</Link>
</div>



        



      </form>
    </div>
  );
}

export const ShowAboutUs= ()=>{
  const {
    data: { data, error, isLoading },
  } = useFetch("http://localhost:8000/api/aboutus");
  const handleDeleteAbout = async (offerId) => {
    try {
      // Send an HTTP DELETE request to the API endpoint
      const response = await fetch(
        `http://127.0.0.1:8000/api/aboutus/destroy/${offerId}`,
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
        window.location.reload();
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
    <div className="space-y-6 p-3 bg-gray-100 m-5 rounded-lg ">
      <div>
        <h1 className="font-semibold text-3xl">About us</h1>
      </div>

      <div className="flex space-x-4">
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 text-white hover:bg-[#07384e]"
          to="/create-aboutus">
          Create About us
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              who We Are Ar
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
               who We Are En
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              our Vision Ar
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              our Vision En
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              our Mission Ar
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              our Mission En
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              location Ar
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              location En
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
                    {item.whoWeAreAr}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.whoWeAreEn}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.ourVisionAr}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.ourVisionEn}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.ourMissionAr}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.ourMissionEn}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.locationAr}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.locationEn}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <button
                      className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                      onClick={() => handleDeleteAbout(item.id)}>
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

export default AboutUs;
