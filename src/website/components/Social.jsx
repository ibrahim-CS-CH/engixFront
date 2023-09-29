import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFetch } from './Landing';
import Swal from 'sweetalert2';

const Social = () => {
    const {
        data: { data, error, isLoading },
      } = useFetch("http://localhost:8000/api/socialmedia");
      const handleDeleteAbout = async (offerId) => {
        try {
          // Send an HTTP DELETE request to the API endpoint
          const response = await fetch(
            `http://127.0.0.1:8000/api/socialmedia/destroy/${offerId}`,
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
    <div className="space-y-6 p-3 bg-gray-100 m-5 rounded-lg ">
    <div>
      <h1 className="font-semibold text-3xl">socail media</h1>
    </div>

    <div className="flex space-x-4">
      <Link
        className="bg-[#0d6992] rounded-md px-1 py-1 text-white hover:bg-[#07384e]"
        to="/add-socail">
        Create socail
      </Link>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            facebook
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
             youtube
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            linkedIn
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            instegram
            </th>
           
           
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {data && data.status===false ? <>no data founded</> : data &&
            data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {item.facebook}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {item.youtupe}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {item.linkedin}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {item.instgram}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <button
                    className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    onClick={() => handleDeleteAbout(item.id)}>
                    delete
                  </button>
                </td>
              </tr>
            )) }
        </tbody>
      </table>
    </div> 
  </div>
  )
}
export const AddSocial = ()=>{
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // ...other fields from previous form
    facebook: '',
    instagram: '',
    youtube: '',
    linkedin: '',
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

      // ...append other fields from previous form

      formDataToSend.append('facebook', formData.facebook);
      formDataToSend.append('instgram', formData.instagram);
      formDataToSend.append('youtupe', formData.youtube);
      formDataToSend.append('linkedin', formData.linkedin);

      // Replace 'your-api-endpoint' with your actual API endpoint
      const response = await fetch('http://localhost:8000/api/socialmedia/create', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        console.log('Data submitted successfully!');
        navigate("/social")
      } else {
        // Handle errors, e.g., show an error message
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Program Form</h2>
      <form onSubmit={handleSubmit}>
        {/* ...other fields from previous form */}

        {/* Facebook */}
        <div className="mb-4">
          <label htmlFor="facebook" className="block text-gray-700 font-medium">
            Facebook:
          </label>
          <input
            type="text"
            id="facebook"
            name="facebook"
            placeholder="Enter Facebook profile link"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={formData.facebook}
            onChange={handleChange}
          />
        </div>

        {/* Instagram */}
        <div className="mb-4">
          <label htmlFor="instagram" className="block text-gray-700 font-medium">
            Instagram:
          </label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            placeholder="Enter Instagram profile link"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={formData.instagram}
            onChange={handleChange}
          />
        </div>

        {/* YouTube */}
        <div className="mb-4">
          <label htmlFor="youtube" className="block text-gray-700 font-medium">
            YouTube:
          </label>
          <input
            type="text"
            id="youtube"
            name="youtube"
            placeholder="Enter YouTube channel link"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={formData.youtube}
            onChange={handleChange}
          />
        </div>

        {/* LinkedIn */}
        <div className="mb-4">
          <label htmlFor="linkedin" className="block text-gray-700 font-medium">
            LinkedIn:
          </label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            placeholder="Enter LinkedIn profile link"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={formData.linkedin}
            onChange={handleChange}
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

export default Social