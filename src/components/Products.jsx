import { Link, useNavigate } from "react-router-dom";
import useProduts from "../hooks/useProducts";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import React from "react";
import { useFetch } from "../website/components/Landing";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
// import MdToggleOn from 'react-icons/md'

export function AddNewProduct() {
  const {
    data: { data: subcategories, error, isLoading },
  } = useFetch("http://127.0.0.1:8000/api/subcats");
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [amount, setAmount] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [priceBefore, setPriceBefore] = useState("");
  const [priceAfter, setPriceAfter] = useState("");
  const [commission, setCommission] = useState("");
  const [brand, setBrand] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [specialProduct, setSpecialProduct] = useState(false);
  const [images, setImages] = useState([]);
  const [barndSelected, setBarndSelected] = useState("");
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");
  const [meduol, setMeduol] = useState("");
  const [youtupe, setYoutupe] = useState("");
  const [test, setTest] = useState("");

  const selectBrand = [
    {
      id: 1,
      value: "store",
    },
    {
      id: 2,
      value: "services",
    },
  ];

  const handleNameArChange = (event) => {
    setNameAr(event.target.value);
  };

  const handleNameEnChange = (event) => {
    setNameEn(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDescriptionArChange = (event) => {
    setDescriptionAr(event.target.value);
  };

  const handleDescriptionEnChange = (event) => {
    setDescriptionEn(event.target.value);
  };

  const handlePriceBeforeChange = (event) => {
    setPriceBefore(event.target.value);
  };

  const handlePriceAfterChange = (event) => {
    setPriceAfter(event.target.value);
  };

  const handleCommissionChange = (event) => {
    setCommission(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleSubCategoryIdChange = (event) => {
    setSubCategoryId(event.target.value);
  };

  const handleSpecialProductToggle = () => {
    setSpecialProduct(!specialProduct);
  };
  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      nameAr,
      nameEn,
      amount,
      descriptionAr,
      descriptionEn,
      priceBefore,
      priceAfter,
      commition: commission,
      brand,
      sub_category_id: subCategoryId,
      spacialProduct: specialProduct,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/products/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const productData = await response.json();
        const createdProductId = productData.productId;

        // Step 2: Send images along with the product ID to another API
        const imageFormData = new FormData();

        for (let i = 0; i < images.length; i++) {
          imageFormData.append(`image[]`, images[i]);
        }
        imageFormData.append("product_id", createdProductId);

        const imageResponse = await fetch(
          "http://localhost:8000/api/images/create",
          {
            method: "POST",
            body: imageFormData,
          }
        );
        if (imageResponse.ok) {
          // Reset the form after successful submission
          setNameAr("");
          setNameEn("");
          setAmount("");
          setDescriptionAr("");
          setDescriptionEn("");
          setPriceBefore("");
          setPriceAfter("");
          setCommission("");
          setBrand("");
          setSubCategoryId("");
          setSpecialProduct(false);
          console.log("added successfully");
          console.log(response);
        }
        // Add success handling logic here
      } else {
        // Handle error responses
        console.error("Failed to create product");
      }
    } catch (error) {
      // Handle network errors here
      console.error("Network error:", error);
    }
  };
  return (
    <>
      {isLoading ? (
        <>loading</>
      ) : (
        <div className="m-5 shadow-lg w-3/4 p-3">
          <Link
            className="bg-[#0d6992] rounded-md px-1 py-1 text-white hover:bg-[#07384e]"
            to={"/products"}>
            products
          </Link>
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
            <div>
              <label className="flex items-center">
                Brand:
                <select
                  name="brand"
                  id="brand"
                  className="border border-black rounded-md"
                  onChange={handleBrandChange}
                  >
                  <option value="">select brand</option>
                  {selectBrand.map((e) => (
                    <option value={e.value} key={e.id}>
                      {e.value}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label className="flex items-center">
                Name (Arabic):
                <input
                  type="text"
                  value={nameAr}
                  onChange={handleNameArChange}
                  className="mx-2 border border-black rounded-md py-1 px-5"
                />
              </label>
            </div>
            <div>
              <label className="flex items-center">
                Name (English):
                <input
                  type="text"
                  value={nameEn}
                  onChange={handleNameEnChange}
                  className="mx-2 border border-black rounded-md py-1 px-5"
                />
              </label>
            </div>
            <div>
              <label className="flex items-center">
                Amount:
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="mx-2 border border-black rounded-md py-1 px-5"
                />
              </label>
            </div>
            <div>
              <label className="flex items-center">
                Commission:
                <input
                  className="mx-2 border border-black rounded-md py-1 px-5"
                  type="number"
                  value={commission}
                  onChange={handleCommissionChange}
                />
              </label>
            </div>
            <div>
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
              <label className="flex items-center">
                Price Before:
                <input
                  className="mx-2 border border-black rounded-md py-1 px-5"
                  type="number"
                  value={priceBefore}
                  onChange={handlePriceBeforeChange}
                />
              </label>
            </div>
            <div>
              <label className="flex items-center">
                Price After:
                <input
                  className="mx-2 border border-black rounded-md py-1 px-5"
                  type="number"
                  value={priceAfter}
                  onChange={handlePriceAfterChange}
                />
              </label>
            </div>
            {barndSelected == "program" && (
              <div>
                <label htmlFor="userName">
                  username:
                  <input
                    className="mx-2 border border-black rounded-md py-1 px-5"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />{" "}
                </label>
              </div>
            )}
            {barndSelected === "program" && (
              <div>
                <label htmlFor="userName">
                  password:
                  <input
                    className="mx-2 border border-black rounded-md py-1 px-5"
                    type="text"
                    value={passwd}
                    onChange={(e) => setPasswd(e.target.value)}
                  />{" "}
                </label>
              </div>
            )}
            {barndSelected == "program" && (<div>
              <label htmlFor="">
                medouls: 
                <input 
                 className="mx-2 border border-black rounded-md py-1 px-5"
                 type="text"
                 value={meduol}
                 onChange={(e) => setMeduol(e.target.value)}
                  />
              </label>
            </div>)}
            {barndSelected == "program" && (<div>
              <label htmlFor="">
                youtupe: 
                <input 
                 className="mx-2 border border-black rounded-md py-1 px-5"
                 type="text"
                 value={youtupe}
                 onChange={(e) => setYoutupe(e.target.value)}
                />
              </label>
            </div>)}
            
            

            {/* <div>
              <label className="flex items-center">
                Brand:
                <input
                  className="mx-2 border border-black rounded-md py-1 px-5"
                  type="text"
                  value={brand}
                  onChange={handleBrandChange}
                />
              </label>
            </div> */}
            <div>
              <label className="flex items-center">
                Select Subcategory:
                <select
                  className="mx-2 border border-black rounded-md py-1 px-5"
                  value={subCategoryId}
                  onChange={handleSubCategoryIdChange}>
                  <option value="">Select a Subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.subCategoryEn}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                Special Product:
                {specialProduct ? (
                  <MdToggleOn
                    color="green"
                    size={"2em"}
                    className="cursor-pointer"
                    onClick={handleSpecialProductToggle}
                  />
                ) : (
                  <MdToggleOff
                    size={"2em"}
                    color="gray"
                    className="cursor-pointer"
                    onClick={handleSpecialProductToggle}
                  />
                )}
              </label>
            </div>
            <div>
              <label className="flex items-center">
                Images:
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </label>
            </div>
            {/* <div>
              <label>
                Special Product:
                <input
                  type="checkbox"
                  checked={specialProduct}
                  onChange={handleSpecialProductChange}
                />
              </label>
            </div> */}
            <div className="flex justify-center lg:col-span-2 space-x-4">
              <button
                type="submit"
                className="border rounded-lg p-2 hover:bg-red-500 hover:text-white hover:border-white duration-300">
                Submit
              </button>
              <Link
                to={"/products"}
                className="border rounded-lg p-2 hover:bg-orange-400 hover:text-white hover:border-white duration-300">
                cancel
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export const EditProduct = () => {
  const handleUpdate = async (e) => {
    e.preventDefault;
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://127.0.0.1:8000/api/product/update/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nameAr,
            nameEn: name,
            amount,
            descriptionAr: descAr,
            descriptionEn: descEn,
            price,
            category_id: findProduct.category_id,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.status == false) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            } else {
              Swal.fire("Saved!", "", "success");
              navigate("/products");
              window.location.reload();
            }
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const handleCancel = () => {
    navigate("/products");
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, category } = useProduts();
  const findProduct = data.find((e) => e.id === +id);

  const [name, setName] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descAr, setDescAr] = useState("");

  return (
    <div className="m-5">
      <Link
        className="bg-[#0d6992] rounded-md px-1 py-1 text-white hover:bg-[#07384e]"
        to={"/products"}>
        products
      </Link>
      <form action="" onSubmit={handleUpdate}>
        <div className="space-y-3 p-3 bg-[#0d6992] text-white rounded-lg mt-3 capitalize">
          <h1 className="font-semibold text-3xl">Edit product {id}</h1>
          {findProduct && (
            <div className="grid grid-cols-3 gap-y-12">
              <label htmlFor="name">
                name
                <input
                  type="text"
                  placeholder={findProduct.nameEn}
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#0d6992] mx-2 border-2 border-white rounded-md py-1 px-5 outline-none focus:border-black"
                />
              </label>
              <label htmlFor="الإسم" className="">
                <input
                  type="text"
                  placeholder={findProduct.nameAr}
                  id="name"
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  className="bg-[#0d6992] mx-2 border-2 border-white rounded-md py-1 px-5 outline-none focus:border-black"
                />
                الإسم
              </label>
              <label htmlFor="price">
                price
                <input
                  type="number"
                  placeholder={findProduct.price}
                  min={0}
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-[#0d6992] mx-2 border-2 border-white rounded-md w-36 py-1 px-5 outline-none focus:border-black"
                />
              </label>
              <label htmlFor="amount">
                amount
                <input
                  type="number"
                  placeholder={findProduct.amount}
                  min={0}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  id="amount"
                  className="bg-[#0d6992] mx-2 border-2 border-white rounded-md w-36 py-1 px-5 outline-none focus:border-black"
                />
              </label>
              {/* <label htmlFor="category" className=''>
              category
              <select name="category" id="category" className='mx-2 border border-black rounded-md' placeholder=''>
                <option value=""  >select...</option>
                {category.map((e)=>(
                  <option value="" key={e.id}>{e.categoryNameEn}</option>
                ))}
              </select>
            </label> */}

              <label htmlFor="description" className="flex ">
                <h2>description</h2>
                <textarea
                  value={descEn}
                  onChange={(e) => setDescEn(e.target.value)}
                  id=""
                  cols="30"
                  rows="1"
                  placeholder={findProduct.descriptionEn}
                  className="bg-[#0d6992] border-2 border-white rounded-md py-1 mx-2 outline-none focus:border-black"></textarea>
              </label>
              <label htmlFor="الوصف" className="flex ">
                <textarea
                  value={descAr}
                  onChange={(e) => setDescAr(e.target.value)}
                  id="الوصف"
                  cols="30"
                  rows="1"
                  placeholder={findProduct.descriptionAr}
                  className="bg-[#0d6992] border-2 border-white rounded-md py-1 mx-2 outline-none focus:border-black"></textarea>
                <h2>الوصف</h2>
              </label>
            </div>
          )}
          <div className="w-full text-white text-center space-x-4 pt-3">
            <input
              type="button"
              value={"update"}
              className="capitalize bg-green-600 rounded-md cursor-pointer w-32 py-2 hover:bg-green-800"
              onClick={handleUpdate}
            />
            <input
              type="button"
              value={"cancel"}
              className="capitalize bg-red-600 rounded-md cursor-pointer w-32 py-2 hover:bg-red-800"
              onClick={handleCancel}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
// /product/destroy/{id}
const Products = () => {
  const { data, subCategory, setData } = useProduts();
  const handleDeleteProduct = async (productId) => {
    try {
      // Send an HTTP DELETE request to the API endpoint
      // const imageRes = await fetch(`http://127.0.0.1:8000/api/images/destroy/${imageId}`,
      // {
      //   method: "DELETE",
      // }
      // );
      // if(imageRes.ok) {
      //   console.log("hi from deleted image");
      // }

      const response = await fetch(
        `http://127.0.0.1:8000/api/products/destroy/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // If the deletion was successful, update the client list
        const updatedData = data.filter((product) => product.id !== productId);
        setData(updatedData);
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
        <h1 className="font-semibold text-3xl">products</h1>
      </div>
      <div>
        <Link
          className="bg-[#0d6992] rounded-md px-1 py-1 text-white hover:bg-[#07384e]"
          to="/addproduct">
          add new product
        </Link>
      </div>
      <div>
        <table className="bg-[#0d6992] text-white capitalize w-3/4 ">
          <thead>
            <tr>
              <td className="border-2 border-white px-2">id</td>
              <td className="border-2 border-white px-2">nameEn</td>
              <td className="border-2 border-white px-2">nameAr</td>
              <td className="border-2 border-white px-2">priceAfter</td>
              <td className="border-2 border-white px-2">priceBefore</td>
              <td className="border-2 border-white px-2">commission</td>
              <td className="border-2 border-white px-2">amount</td>
              <td className="border-2 border-white px-2">category</td>
              <td className="border-2 border-white px-2">images</td>
              <td className="border-2 border-white px-2">actions</td>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={e.id}>
                <td className="border-2 border-white px-2 py-1">{e.id}</td>
                <td className="border-2 border-white px-2 py-1">{e.nameEn}</td>
                <td className="border-2 border-white px-2 py-1">{e.nameAr}</td>
                <td className="border-2 border-white px-2 py-1">
                  {e.priceAfter}
                </td>
                <td className="border-2 border-white px-2 py-1">
                  {e.priceBefore}
                </td>
                <td className="border-2 border-white px-2 py-1">
                  {e.commition}
                </td>
                <td className="border-2 border-white px-2 py-1">{e.amount}</td>
                {subCategory.map((x) => {
                  if (x.id === e.sub_category_id) {
                    return (
                      <td
                        key={x.id}
                        className="border-2 border-white px-2 py-1">
                        {x.subCategoryEn}
                      </td>
                    );
                  }
                })}
                <td className="border-2 border-white px-2 py-1 grid grid-cols-2">
                  {/* {e.images.map((i) => (
                    <img
                      src={i.image}
                      alt={e.nameEn}
                      key={i.id}
                      className="col-span-1 w-32"
                    />
                  ))} */}
                </td>
                <td className="border-2 border-white px-2 space-x-3">
                  {/* <Link
                    className="bg-yellow-500 hover:bg-yellow-700 rounded-md px-1 my-1"
                    to={`/edit/${e.id}`}>
                    edit
                  </Link> */}
                  <button
                    className="bg-red-500 capitalize rounded-md px-1 hover:bg-red-700"
                    onClick={() => handleDeleteProduct(e.id)}
                    id={e.id}>
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

export default Products;
