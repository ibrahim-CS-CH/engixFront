import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../website/components/Landing";
import Swal from "sweetalert2";

const OurWorks = () => {
  const naviage = useNavigate();
  const {
    data: { data, error, isLoading },
  } = useFetch("http://localhost:8000/api/ourWork");
  const handleDeleteClient = async (careerId) => {
    try {
      // Send an HTTP DELETE request to the API endpoint
      const response = await fetch(
        `http://127.0.0.1:8000/api/ourWork/destroy/${careerId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // If the deletion was successful, update the client list
        // const updatedCareer = data.filter((career) => career.id !== careerId);
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
    <div>
      <div>
        <h1 className="font-semibold text-3xl">our work</h1>
      </div>{" "}
      <div className="space-x-8 my-5">
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 whitespace-normal text-white hover:bg-[#07384e]"
          to="/add-category-work">
          add new work category
        </Link>
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 whitespace-normal text-white hover:bg-[#07384e]"
          to="/add-work">
          add new work
        </Link>
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 whitespace-normal text-white hover:bg-[#07384e]"
          to="/work-category">
          work category
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
                Image
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Category ID
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
                    <img
                      src={item.image}
                      alt={`Image for ${item.nameEn}`}
                      className="h-16 w-16 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.category_our_work?.nameEn}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <button
                      className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                      onClick={() => handleDeleteClient(item.id)}>
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

export const AddCategoryWork = () => {
  const navigate = useNavigate();
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/categoryOurWork/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nameAr,
            nameEn,
          }),
        }
      );

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        console.log("Work category added successfully!");
        navigate("/ourWorks");
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to add work category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      {/* <h2 className="text-2xl font-semibold mb-4">Add New Work Category</h2> */}
      <form onSubmit={handleSubmit}>
        {/* Work Category Name in Arabic */}
        <div className="mb-4">
          <label htmlFor="nameAr" className="block text-gray-700 font-medium">
            Name (Arabic):
          </label>
          <input
            type="text"
            id="nameAr"
            name="nameAr"
            placeholder="Enter name in Arabic"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
            required
          />
        </div>

        {/* Work Category Name in English */}
        <div className="mb-4">
          <label htmlFor="nameEn" className="block text-gray-700 font-medium">
            Name (English):
          </label>
          <input
            type="text"
            id="nameEn"
            name="nameEn"
            placeholder="Enter name in English"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            required
          />
        </div>
        <div className="space-x-4">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
            Add Work Category
          </button>
          <Link
            to={-1}
            className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
            cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
export function AddWork() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    image: null,
    category_our_work_id: "", // Store the selected file here
  });
  const {
    data: { data, error, isLoading },
  } = useFetch("http://127.0.0.1:8000/api/categoryOurWork");

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handle file input separately
    if (type === "file") {
      const selectedFile = e.target.files[0];
      setFormData({ ...formData, [name]: selectedFile });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to the API
    const formDataToSend = new FormData();
    formDataToSend.append("nameAr", formData.nameAr);
    formDataToSend.append("nameEn", formData.nameEn);
    formDataToSend.append("image", formData.image);
    formDataToSend.append(
      "category_our_work_id",
      formData.category_our_work_id
    );

    try {
      // Send formDataToSend to your API endpoint using fetch or Axios.
      const response = await fetch("http://localhost:8000/api/ourWork/create", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect.
        console.log("Work added successfully!");
        navigate("/ourWorks");
      } else {
        // Handle errors, e.g., show an error message.
        console.error("Failed to add work");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Work</h2>
      <form onSubmit={handleSubmit}>
        {/* Work Name in Arabic */}
        <div className="mb-4">
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

        {/* Work Name in English */}
        <div className="mb-4">
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
        <div className="mb-4">
          <label
            htmlFor="category_our_work_id"
            className="block text-gray-700 font-medium">
            category
          </label>
          <select
            name="category_our_work_id"
            id="category_our_work_id"
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500">
            <option value="">select category</option>
            {data &&
              data.map((e) => (
                <option value={e.id} key={e.id}>
                  {e.nameEn}
                </option>
              ))}
          </select>
        </div>

        {/* Work Image */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-medium">
            Image:
          </label>
          <input
            type="file"
            accept="image/*"
            id="image"
            name="image"
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div className=" lg:space-x-8">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
            Add Work
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
}
export const WorkCategory = ()=>{
  const {data: {data, isLoading, error}} = useFetch("http://127.0.0.1:8000/api/categoryOurWork");
  const handleDeleteClient = async (careerId) => {
    try {
      // Send an HTTP DELETE request to the API endpoint
      const response = await fetch(
        `http://127.0.0.1:8000/api/categoryOurWork/destroy/${careerId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // If the deletion was successful, update the client list
        // const updatedCareer = data.filter((career) => career.id !== careerId);
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
  return(
    <div>
    <div>
      <h1 className="font-semibold text-3xl">our work</h1>
    </div>{" "}
    <div className="space-x-8 my-5">
      <Link
        className="bg-[#0d6992] rounded-md px-1 py-1 whitespace-normal text-white hover:bg-[#07384e]"
        to="/add-category-work">
        add new work category
      </Link>
      <Link
        className="bg-[#0d6992] rounded-md px-1 py-1 whitespace-normal text-white hover:bg-[#07384e]"
        to="/add-work">
        add new work
      </Link>
      <Link
        className="bg-[#0d6992] rounded-md px-1 py-1 whitespace-normal text-white hover:bg-[#07384e]"
        to="/work-category">
        work category
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
                  <button
                    className={`px-4 py-2 text-white ${item.our_work?.length && "bg-gray-500"} bg-red-500 rounded-md  focus:outline-none focus:bg-red-600`}
                    onClick={() => handleDeleteClient(item.id)}
                    disabled={item.our_work?.length}
                    >
                    delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default OurWorks;
