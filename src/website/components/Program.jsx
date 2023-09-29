import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "./Landing";
import Swal from "sweetalert2";

const Program = () => {
    const {
        data: { data, error, isLoading },
      } = useFetch("http://localhost:8000/api/Program");
      console.log(data);
      const handleProgramDelete = async (programId)=>{
        try {
            // Send an HTTP DELETE request to the API endpoint
            const response = await fetch(
              `http://127.0.0.1:8000/api/Program/destroy/${programId}`,
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
      }
  return (
    <div>
      <div>
        <h1 className="font-semibold text-3xl">Programs</h1>
      </div>{" "}
      <div className="space-x-8 my-5">
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 whitespace-normal text-white hover:bg-[#07384e]"
          to="/add-category-program">
          add new category program
        </Link>
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 whitespace-normal text-white hover:bg-[#07384e]"
          to="/add-program">
          add new program
        </Link>
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 whitespace-normal text-white hover:bg-[#07384e]"
          to="/category-program">
          category program
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
                Price After 
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Price Before
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
               Commission
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Test Link
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              UserName

              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Password
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              youtube
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Category
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
                        {item.nameProgramAr}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.nameProgramEn}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.descriptionAr}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.descriptionEn}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.priceAfter}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.priceBefore}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.commition}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.test
}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.userName}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.password}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.youtupe}
                      </td>


                      <td className="px-6 py-4 whitespace-no-wrap">
                        <img
                          src={item.image}
                          alt={`Image for ${item.nameEn}`}
                          className="h-16 w-16 object-cover rounded-full"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.catagoryprogram?.categoryNameEn}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <button
                          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                          onClick={() => handleProgramDelete(item.id)}>
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
export const AddcategoryProgram = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    categoryNameAr: "",
    categoryNameEn: "",
    descriptionAr: "",
    descriptionEn: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("categoryNameAr", formData.categoryNameAr);
      formDataToSend.append("categoryNameEn", formData.categoryNameEn);
      formDataToSend.append("desctriptionAr", formData.descriptionAr);
      formDataToSend.append("desctriptionEn", formData.descriptionEn);
      formDataToSend.append("image", formData.image);

      // Replace 'your-api-endpoint' with your actual API endpoint
      const response = await fetch(
        "http://localhost:8000/api/CategoryProgram/create",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        console.log("Data submitted successfully!");
        navigate("/category-program");
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-7xl  p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Category Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="lg:flex justify-center lg:space-x-8 w-[100%]">
          {/* categoryNameAr */}
          <div className="mb-4  w-full">
            <label
              htmlFor="categoryNameAr"
              className="block text-gray-700 font-medium">
              Category Name (Arabic):
            </label>
            <input
              type="text"
              id="categoryNameAr"
              name="categoryNameAr"
              placeholder="Enter category name in Arabic"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.categoryNameAr}
              onChange={handleChange}
              required
            />
          </div>

          {/* categoryNameEn */}
          <div className="mb-4 w-full">
            <label
              htmlFor="categoryNameEn"
              className="block text-gray-700 font-medium">
              Category Name (English):
            </label>
            <input
              type="text"
              id="categoryNameEn"
              name="categoryNameEn"
              placeholder="Enter category name in English"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.categoryNameEn}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="lg:flex justify-center lg:space-x-8 w-[100%]">
          {/* descriptionAr */}
          <div className="mb-4 w-full">
            <label
              htmlFor="descriptionAr"
              className="block text-gray-700 font-medium">
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
              required></textarea>
          </div>

          {/* descriptionEn */}
          <div className="mb-4 w-full">
            <label
              htmlFor="descriptionEn"
              className="block text-gray-700 font-medium">
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
              required></textarea>
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
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex lg:space-x-8 space-x-4 justify-center">
          <button
            type="submit"
            className="lg:flex  px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
            Submit
          </button>
          <Link
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            to={-1}>
            cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
export const CategoryProgram = () => {
  const {
    data: { data, error, isLoading },
  } = useFetch("http://localhost:8000/api/CategoryProgram");
  const handleDeleteClient = async (careerId) => {
    try {
      // Send an HTTP DELETE request to the API endpoint
      const response = await fetch(
        `http://127.0.0.1:8000/api/CategoryProgram/destroy/${careerId}`,
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
        <h1 className="font-semibold text-3xl">category program</h1>
      </div>{" "}
      <div className="space-x-8 my-5">
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 whitespace-normal text-white hover:bg-[#07384e]"
          to="/add-category-program">
          add new category program
        </Link>
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 whitespace-normal text-white hover:bg-[#07384e]"
          to="/add-program">
          add new program
        </Link>
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 whitespace-normal text-white hover:bg-[#07384e]"
          to="/program">
          program
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
                    {item.categoryNameAr}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.categoryNameEn}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.desctriptionAr}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.desctriptionEn}
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
                      className={`${
                        item.program.length && "bg-gray-300"
                      } px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600`}
                      onClick={() => handleDeleteClient(item.id)}
                      disabled={item.program.length}>
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
export const AddProgram = () => {
    const navigate = useNavigate();
  const {
    data: { data, error, isLoading },
  } = useFetch("http://localhost:8000/api/CategoryProgram");

  const [formData, setFormData] = useState({
    descriptionAr: "",
    descriptionEn: "",
    image: null,
    youtube: "",
    test: "",
    nameProgramAr: "",
    nameProgramEn: "",
    userName: "",
    password: "",
    priceBefore: "",
    priceAfter: "",
    commition: "",
    Meduol: "",
    category_program_id: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("descriptionAr", formData.descriptionAr);
      formDataToSend.append("descriptionEn", formData.descriptionEn);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("youtupe", formData.youtube);
      formDataToSend.append("test", formData.test);
      formDataToSend.append("nameProgramAr", formData.nameProgramAr);
      formDataToSend.append("nameProgramEn", formData.nameProgramEn);
      formDataToSend.append("userName", formData.userName);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("priceBefore", formData.priceBefore);
      formDataToSend.append("priceAfter", formData.priceAfter);
      formDataToSend.append("commition", formData.commition);
      formDataToSend.append("Meduol", JSON.stringify(formData.Meduol));
      formDataToSend.append(
        "category_program_id",
        formData.category_program_id
      );

      // Replace 'your-api-endpoint' with your actual API endpoint
      const response = await fetch("http://localhost:8000/api/Program/create", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        console.log("Data submitted successfully!");
        navigate("/program")
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-7xl p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Program Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="lg:flex justify-center lg:space-x-8 w-[100%]">
          {/* nameProgramAr */}
          <div className="mb-4 w-full">
            <label
              htmlFor="nameProgramAr"
              className="block text-gray-700 font-medium">
              Program Name (Arabic):
            </label>
            <input
              type="text"
              id="nameProgramAr"
              name="nameProgramAr"
              placeholder="Enter program name in Arabic"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.nameProgramAr}
              onChange={handleChange}
              required
            />
          </div>

          {/* nameProgramEn */}
          <div className="mb-4 w-full">
            <label
              htmlFor="nameProgramEn"
              className="block text-gray-700 font-medium">
              Program Name (English):
            </label>
            <input
              type="text"
              id="nameProgramEn"
              name="nameProgramEn"
              placeholder="Enter program name in English"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.nameProgramEn}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="lg:flex justify-center lg:space-x-8 w-[100%]">
          {/* descriptionAr */}
          <div className="mb-4 w-full">
            <label
              htmlFor="descriptionAr"
              className="block text-gray-700 font-medium">
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
              required></textarea>
          </div>

          {/* descriptionEn */}
          <div className="mb-4 w-full">
            <label
              htmlFor="descriptionEn"
              className="block text-gray-700 font-medium">
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
              required></textarea>
          </div>
        </div>
        <div className="lg:flex justify-center lg:space-x-8 w-[100%]">
          {/* priceBefore */}
          <div className="mb-4 w-full">
            <label
              htmlFor="priceBefore"
              className="block text-gray-700 font-medium">
              Price Before:
            </label>
            <input
              type="number"
              id="priceBefore"
              name="priceBefore"
              placeholder="Enter price before"
              step="0.01"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.priceBefore}
              onChange={handleChange}
              required
            />
          </div>

          {/* priceAfter */}
          <div className="mb-4 w-full">
            <label
              htmlFor="priceAfter"
              className="block text-gray-700 font-medium">
              Price After:
            </label>
            <input
              type="number"
              id="priceAfter"
              name="priceAfter"
              placeholder="Enter price after"
              step="0.01"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.priceAfter}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="lg:flex justify-center lg:space-x-8 w-[100%]">
          {/* commition */}
          <div className="mb-4 w-full">
            <label
              htmlFor="commition"
              className="block text-gray-700 font-medium">
              Commission:
            </label>
            <input
              type="number"
              id="commition"
              name="commition"
              placeholder="Enter commission"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.commition}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="commition"
              className="block text-gray-700 font-medium">
              category program:
            </label>
            <select
              onChange={handleChange}
              name="category_program_id"
              id="category_program_id"
              required
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500">
              <option value="">select category</option>
              {data &&
                data.map((e) => (
                  <option value={e.id} key={e.id}>
                    {e.categoryNameEn}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="lg:flex justify-center lg:space-x-8 w-[100%]">
          {/* YouTube */}
          <div className="mb-4 w-full">
            <label
              htmlFor="youtube"
              className="block text-gray-700 font-medium">
              YouTube:
            </label>
            <input
              type="text"
              id="youtube"
              name="youtube"
              placeholder="Enter YouTube link"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.youtube}
              onChange={handleChange}
            />
          </div>

          {/* Test */}
          <div className="mb-4 w-full">
            <label htmlFor="test" className="block text-gray-700 font-medium">
              Test:
            </label>
            <input
              type="text"
              id="test"
              name="test"
              placeholder="Enter test information"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.test}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="lg:flex justify-center lg:space-x-8 w-[100%]">
          {/* userName */}
          <div className="mb-4 w-full">
            <label
              htmlFor="userName"
              className="block text-gray-700 font-medium">
              User Name:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Enter user name"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          {/* password */}
          <div className="mb-4 w-full">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium">
              Password:
            </label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={formData.password}
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
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            onChange={handleChange}
            required
          />
        </div>

        {/* Meduol */}
        <div className="mb-4">
          <label htmlFor="Meduol" className="block text-gray-700 font-medium">
            Meduol:
          </label>
          <textarea
            id="Meduol"
            name="Meduol"
            rows="4"
            placeholder="Enter Meduol"
            className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={formData.Meduol}
            onChange={handleChange}
            required></textarea>
        </div>

        <div className="flex justify-center lg:space-x-8 space-x-4">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
            Submit
          </button>
          <Link
            to={-1}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none">
            cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Program;
