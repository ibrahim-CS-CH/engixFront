import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../website/components/Landing";
import Swal from "sweetalert2";

function Careers() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    locationAr: "",
    locationEn: "",
    requirmentEn: "",
    requirmentAr: "",
    descriptionEn: "",
    descriptionAr: "",
    whatYouWillDo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (
    //   !formData.descriptionAr |
    //   !formData.descriptionEn |
    //   !formData.locationAr |
    //   !formData.locationEn |
    //   !formData.locationAr |
    //   !formData.nameAr |
    //   !formData.nameEn |
    //   !formData.requirmentAr |
    //   !formData.requirmentEn
    // ) {console.log("no data to send ");}
      try {
        const response = await fetch("http://127.0.0.1:8000/api/jobs/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Handle success, e.g., show a success message or redirect.
          console.log("Job created successfully!");
          navigate("/careers");

        } else {
          // Handle errors, e.g., show an error message.
          console.error("Failed to create job");
        }
      } catch (error) {
        console.error("Error:", error);
      }
  };

  return (
    <div>
      <h1>Create a Job</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 lg:max-w-7xl ">
        <div className="flex flex-wrap gap-4 lg:max-w-7xl ">
          <div>
            <label>Name (Arabic):</label>
            <input
              className="border border-blue-300"
              type="text"
              name="nameAr"
              value={formData.nameAr}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Name (English):</label>
            <input
              className="border border-blue-300"
              type="text"
              name="nameEn"
              value={formData.nameEn}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Location (Arabic):</label>
            <input
              className="border border-blue-300"
              type="text"
              name="locationAr"
              value={formData.locationAr}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Location (English):</label>
            <input
              className="border border-blue-300"
              type="text"
              name="locationEn"
              value={formData.locationEn}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Requirements (Arabic):</label>
            <input
              className="border border-blue-300"
              type="text"
              name="requirmentAr"
              value={formData.requirmentAr}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Requirements (English):</label>
            <input
              className="border border-blue-300"
              type="text"
              name="requirmentEn"
              value={formData.requirmentEn}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description (Arabic):</label>
            <textarea
              className="border border-blue-300"
              name="descriptionAr"
              value={formData.descriptionAr}
              onChange={handleChange}
              required></textarea>
          </div>
          <div>
            <label>Description (English):</label>
            <textarea
              className="border border-blue-300"
              name="descriptionEn"
              value={formData.descriptionEn}
              onChange={handleChange}
              required></textarea>
          </div>
          <div>
            <label>What You Will Do:</label>
            <textarea
              className="border border-blue-300"
              name="whatYouWillDo"
              value={formData.whatYouWillDo}
              onChange={handleChange}
              required></textarea>
          </div>
        </div>
        <div className=" mx-auto flex space-x-8">
          <button
            type="submit"
            className="border rounded-lg p-2 hover:border-blue-400">
            Submit
          </button>
          <Link to={-1} className="border rounded-lg p-2 hover:border-blue-400">
            cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
export const  CareerList =()=>  {
  const {data: {data, isLoading, error}} = useFetch("http://127.0.0.1:8000/api/jobs");
  const handleDeleteClient = async (careerId) => {
    try {
      // Send an HTTP DELETE request to the API endpoint
      const response = await fetch(`http://127.0.0.1:8000/api/jobs/destroy/${careerId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If the deletion was successful, update the client list
        // const updatedCareer = data.filter((career) => career.id !== careerId);
        console.log("delted");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'deleted successfully',
          showConfirmButton: false,
          timer: 1000
        });
        window.location.reload();
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
    <div>
      {error &&  <>{error}</>}
      {isLoading ? <> loading </> 
        :<div className="space-y-6 p-3 bg-gray-100 m-5 rounded-lg ">
        <div>
          <h1 className="font-semibold text-3xl">Career</h1>
        </div>
        <div>
          <Link
            className="bg-[#0d6992] rounded-md px-1 py-1 whitespace-normal text-white hover:bg-[#07384e]"
            to="/add-career">
            add new career
          </Link>
        </div>
        <div className="">
          <table className="bg-[#0d6992] text-white capitalize whitespace-pre">
            <thead>
              <tr className="">
                <td className="border-2 border-white px-2">nameEn</td>
                <td className="border-2 border-white px-2">nameAr</td>
                <td className="border-2 border-white px-2">locationAr</td>
                <td className="border-2 border-white px-2">locationEn</td>
                <td className="border-2 border-white px-2">descriptionAr</td>
                <td className="border-2 border-white px-2">descriptionEn</td>
                <td className="border-2 border-white px-2">requirmentAr</td>
                <td className="border-2 border-white px-2">requirmentEn</td>
                <td className="border-2 border-white px-2">whatYouWillDo</td>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {data && data.map((e) => (
                <tr key={e.id} className="">
                  <td className="border-2 border-white px-2 py-1 whitespace-no-wrap ">{e.nameEn}</td>
                  <td className="border-2 border-white px-2 py-1 whitespace-no-wrap">{e.nameAr}</td>
                  <td className="border-2 border-white px-2 py-1 whitespace-no-wrap">{e.locationAr}</td>
                  <td className="border-2 border-white px-2 py-1 whitespace-no-wrap">{e.locationEn}</td>
                  <td className="border-2 border-white px-2 py-1 whitespace-no-wrap">{e.descriptionAr}</td>
                  <td className="border-2 border-white px-2 py-1 whitespace-no-wrap">{e.descriptionEn}</td>
                  <td className="border-2 border-white px-2 py-1 whitespace-no-wrap">{e.requirmentAr}</td>
                  <td className="border-2 border-white px-2 py-1 whitespace-no-wrap">{e.requirmentEn}</td>
                  <td className="border-2 border-white px-2 py-1 whitespace-no-wrap">{e.whatYouWillDo}</td>
                  
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
      </div> }
      {/* {isLoading && <>loadnin</>} 
      {JSON.stringify(data)} */}
    </div>
  )
}

export default Careers;
