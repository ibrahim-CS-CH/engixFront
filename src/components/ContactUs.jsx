import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../website/components/Landing";

const ContactUs = () => {
  const {
    data: { data, error, isLoading },
  } = useFetch("http://localhost:8000/api/contactus");
  console.log(data);
  const handleDeleteContact = async (offerId) => {
    try {
      // Send an HTTP DELETE request to the API endpoint
      const response = await fetch(
        `http://127.0.0.1:8000/api/contactus/destroy/${offerId}`,
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
        <h1 className="font-semibold text-3xl">Contact us</h1>
      </div>

      <div className="flex space-x-4">
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 text-white hover:bg-[#07384e]"
          to="/add-contactus">
          add contact
        </Link>
      </div>
      {/* {data && console.log(ada);} */}
      {/* {data.message && <>{data.message}</>} */}
      {!data ? <>not data founded</> :
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
               Phone
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Telephone
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              WhatsApp
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
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.tel}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.whatsApp}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <button
                      className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                      onClick={() => handleDeleteContact(item.id)}>
                      delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div> 
      }
    </div>
  );
};

export const AddContact = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    whatsApp: "",
    tel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send formData to your API endpoint using fetch or Axios.
      const response = await fetch(
        "http://127.0.0.1:8000/api/contactus/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect.
        console.log("Data submitted successfully!");
      } else {
        // Handle errors, e.g., show an error message.
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-medium">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* WhatsApp */}
        <div className="mb-4">
          <label htmlFor="whatsApp" className="block text-gray-700 font-medium">
            WhatsApp:
          </label>
          <input
            type="tel"
            id="whatsApp"
            name="whatsApp"
            placeholder="Enter your WhatsApp number"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={formData.whatsApp}
            onChange={handleChange}
          />
        </div>

        {/* Tel */}
        <div className="mb-4">
          <label htmlFor="tel" className="block text-gray-700 font-medium">
            Tel:
          </label>
          <input
            type="tel"
            id="tel"
            name="tel"
            placeholder="Enter your telephone number"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={formData.tel}
            onChange={handleChange}
          />
        </div>
        <div className=" lg:space-x-8">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
            Submit
          </button>
          <Link
            to={-1}
            className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none">
            cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
