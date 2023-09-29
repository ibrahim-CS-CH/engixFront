import React, { useState } from "react";
import { Link } from "react-router-dom";
import useProduts from "../hooks/useProducts";
import Swal from "sweetalert2";
import { useFetch } from "../website/components/Landing";
export const AddNewCategory = () => {
  const [categoryNameAr, setCategoryNameAr] = useState("");
  const [categoryNameEn, setCategoryNameEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState(null);
  const [barndSelected, setBarndSelected] = useState("")
  const selectBrand = [
    {
      id:1,
      value: "store"
    },
    
    {
      id:3,
      value: "services"
    },
  ]

  const handleCategoryNameArChange = (event) => {
    setCategoryNameAr(event.target.value);
  };

  const handleCategoryNameEnChange = (event) => {
    setCategoryNameEn(event.target.value);
  };

  const handleDescriptionArChange = (event) => {
    setDescriptionAr(event.target.value);
  };

  const handleDescriptionEnChange = (event) => {
    setDescriptionEn(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("categoryNameAr", categoryNameAr);
    formData.append("categoryNameEn", categoryNameEn);
    formData.append("desctriptionAr", descriptionAr);
    formData.append("desctriptionEn", descriptionEn);
    formData.append("prand", barndSelected);
    formData.append("image", image);
    if (
      !categoryNameAr ||
      !categoryNameEn ||
      !descriptionAr ||
      !descriptionEn ||
      barndSelected == "" ||
      !image
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "please make sure to enter new category",
      });
      return;
    }
    // if(barndSelected === "program") {
    //   try {
    //     const response = await fetch(
    //       "http://127.0.0.1:8000/api/CategoryProgram/create",
    //       {
    //         method: "POST",
    //         body: formData,
    //       }
    //     );
  
    //     if (response.ok) {
    //       // Reset the form after successful submission
    //       setCategoryNameAr("");
    //       setCategoryNameEn("");
    //       setDescriptionAr("");
    //       setDescriptionEn("");
    //       setBrand("");
    //       setImage(null);
    //       Swal.fire({
    //         position: "center",
    //         icon: "success",
    //         title: "added new client successfully",
    //         showConfirmButton: false,
    //         timer: 1000,
    //       });
    //       navigate("/categories");
    //       window.location.reload();
  
    //       // Add success handling logic here
    //     } else {
    //       // Handle error responses
    //       console.error("Failed to create category");
    //     }
    //   } catch (error) {
    //     // Handle network errors here
    //     console.error("Network error:", error);
    //   }
    // }
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/categories/create",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // Reset the form after successful submission
        setCategoryNameAr("");
        setCategoryNameEn("");
        setDescriptionAr("");
        setDescriptionEn("");
        setBrand("");
        setImage(null);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "added new client successfully",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/categories");
        window.location.reload();

        // Add success handling logic here
      } else {
        // Handle error responses
        console.error("Failed to create category");
      }
    } catch (error) {
      // Handle network errors here
      console.error("Network error:", error);
    }
  };

  return (
    <div className=" m-5 shadow-lg rounded-2xl py-2 lg:w-3/4 overflow-auto">
      <Link
        className="w-fit bg-[#0d6992] rounded-md px-1 py-1 text-white hover:bg-[#07384e]"
        to={"/categories"}>
        categories
      </Link>
      <form onSubmit={handleSubmit} className="m-5 grid lg:grid-cols-2 gap-8">
        <div>
          Category Name (Arabic):
          <label>
            <input
              className="border border-black rounded-md"
              type="text"
              value={categoryNameAr}
              onChange={handleCategoryNameArChange}
            />
          </label>
        </div>
        <div>
          <label>
            Category Name (English):
            <input
              className="border border-black rounded-md"
              type="text"
              value={categoryNameEn}
              onChange={handleCategoryNameEnChange}
            />
          </label>
        </div>
        <div>
          <label className="flex items-center">
            Description (Arabic):
            <textarea
              className="border border-black rounded-md"
              value={descriptionAr}
              onChange={handleDescriptionArChange}></textarea>
          </label>
        </div>
        <div>
          <label className="flex items-center">
            Description (English):
            <textarea
              className="border border-black rounded-md "
              value={descriptionEn}
              onChange={handleDescriptionEnChange}></textarea>
          </label>
        </div>
        <div>
          <label>
            Brand:
            <select name="brand" id="brand" className="border border-black rounded-md" onChange={((e)=>setBarndSelected(e.target.value))}>
              <option value="">select brand</option>
              {selectBrand.map((e)=>(
                <option value={e.value} key={e.id}>{e.value}</option>
              ))}
            </select>
            {/* <input
              className="border border-black rounded-md"
              type="text"
              value={brand}
              onChange={handleBrandChange}
            /> */}
          </label>
        </div>
        <div>
          <label>
            Image:
            <input
              className="border border-black rounded-md cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className=" col-span-2 lg:flex grid justify-center lg:space-x-4">
          <button
            className="border border-black rounded-md p-2 hover:bg-red-500 duration-300 hover:text-white hover:border-white  "
            type="submit">
            Submit
          </button>
          <Link
            to={"/categories"}
            className="border border-black rounded-md p-2 hover:bg-orange-500 duration-300 hover:text-white  hover:border-white  ">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
// `http://127.0.0.1:8000/api/categories/destroy/${careerId}`,
// `http://127.0.0.1:8000/api/subcats/destroy/${careerId}`,

const Categories = () => {
  const handleDeleteClient = async (careerId) => {
    try {
      // Send an HTTP DELETE request to the API endpoint
      const response = await fetch(
        `http://127.0.0.1:8000/api/subcats/destroy/${careerId}`,
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
  const { subCategory, category } = useProduts();
  return (
    <div className="space-y-6 p-3 bg-gray-100 m-5 rounded-lg ">
      <div>
        <h1 className="font-semibold text-3xl">categories</h1>
      </div>
      <div className="space-x-4">
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 text-white hover:bg-[#07384e]"
          to="/addcategory">
          add new category
        </Link>
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 text-white hover:bg-[#07384e]"
          to="/addsubcategory">
          add new sub category
        </Link>
      </div>
      <div>
        <table className="bg-[#0d6992] text-white capitalize w-3/4 ">
          <thead>
            <tr>
              <td className="border-2 border-white px-2">id</td>
              <td className="border-2 border-white px-2">subCategory</td>
              <td className="border-2 border-white px-2">category</td>
              <td className="border-2 border-white px-2">actions</td>
            </tr>
          </thead>
          <tbody>
            {subCategory.map((e, i) => (
              <tr key={e.id}>
                <td className="border-2 border-white px-2 py-1">{i + 1}</td>
                <td className="border-2 border-white px-2 py-1">
                  {e.subCategoryEn}
                </td>
                {category.map((x) => {
                  if (x.id == e.category_id) {
                    return (
                      <td
                        key={e.id}
                        className="border-2 border-white px-2 py-1">
                        {x.categoryNameEn}
                      </td>
                    );
                  }
                })}
                <td className="border-2 border-white px-2 space-x-3">
                  <Link className="bg-yellow-500 hover:bg-yellow-700 rounded-md px-1 my-1">
                    edit
                  </Link>
                  <button className="bg-red-500 rounded-md px-1 hover:bg-red-700"
                    onClick={() => handleDeleteClient(e.id)}
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
  );
};
export const AddNewSubCategory = () => {
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryAr, setSubCategoryAr] = useState("");
  const [subCategoryEn, setSubCategoryEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");

  const handleCategoryIdChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleSubCategoryArChange = (event) => {
    setSubCategoryAr(event.target.value);
  };

  const handleSubCategoryEnChange = (event) => {
    setSubCategoryEn(event.target.value);
  };

  const handleDescriptionArChange = (event) => {
    setDescriptionAr(event.target.value);
  };

  const handleDescriptionEnChange = (event) => {
    setDescriptionEn(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

//     subCategoryAr
// subCategoryEn
// desctriptionAr
// desctriptionEn
// image
// category_id
    const formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("subCategoryAr", subCategoryAr);
    formData.append("subCategoryEn", subCategoryEn);
    formData.append("desctriptionAr", descriptionAr);
    formData.append("desctriptionEn", descriptionEn);
    formData.append("image", image);
    if(!categoryId || !subCategoryAr || !subCategoryEn || !descriptionAr || !descriptionEn || !image) {
      return ;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/subcats/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Reset the form after successful submission
        setCategoryId("");
        setSubCategoryAr("");
        setSubCategoryEn("");
        setDescriptionAr("");
        setDescriptionEn("");
        setImage(null);
        console.log("successfully Added");
        // Add success handling logic here
      } else {
        // Handle error responses
        console.error("Failed to create subcategory");
      }
    } catch (error) {
      // Handle network errors here
      console.error("Network error:", error);
    }
  };

  const {
    data: { data: categories, error, isLoading },
  } = useFetch("http://127.0.0.1:8000/api/categories");
  const {
    data: { data: categoriesProgram, error: programError, isLoading: loadingProgram },
  } = useFetch("http://127.0.0.1:8000/api/CategoryProgram");
    console.log(categoriesProgram);
  return isLoading ? (
    <>loading</>
  ) : (
    <div className="m-5 shadow-lg p-3 w-3/4">
      <Link
        className="bg-[#0d6992] rounded-md px-1 py-1 text-white hover:bg-[#07384e]"
        to={"/categories"}>
        categories
      </Link>
      <form onSubmit={handleSubmit} className="grid grid-cols-2  gap-8 py-2">
        <div>
          <label>
            Select Category:
            <select
              value={categoryId}
              onChange={handleCategoryIdChange}
              defaultValue={"Select a Category"}
              className="border border-black rounded-md py-1 px-5"
              >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryNameEn}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className="flex items-center">
            Subcategory Name (Arabic):
            <input
              type="text"
              value={subCategoryAr}
              onChange={handleSubCategoryArChange}
              className="mx-2 border border-black rounded-md py-1 px-5"
            />
          </label>
        </div>
        <div>
          <label className="flex items-center">
            Subcategory Name (English):
            <input
              type="text"
              value={subCategoryEn}
              onChange={handleSubCategoryEnChange}
              className="mx-2 border border-black rounded-md py-1 px-5"
            />
          </label>
        </div>
        <div >
          <label className="flex items-center">
            Description (Arabic):
            <textarea
              value={descriptionAr}
              onChange={handleDescriptionArChange}
              className="mx-2 border border-black rounded-md py-1 px-5"></textarea>
          </label>
        </div>
        <div>
          <label className="flex items-center">
            Description (English):
            <textarea
              className="mx-2 border border-black rounded-md py-1 px-5"
              value={descriptionEn}
              onChange={handleDescriptionEnChange}></textarea>
          </label>
        </div>
        <div>
          <label>
            Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>
        <div className="flex justify-center col-span-2 space-x-4">
          <button type="submit" className="border rounded-lg p-2 hover:bg-red-500 hover:text-white hover:border-white duration-300">submit</button>
          <Link to={"/categories"} className="border rounded-lg p-2 hover:bg-orange-400 hover:text-white hover:border-white duration-300">cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default Categories;
