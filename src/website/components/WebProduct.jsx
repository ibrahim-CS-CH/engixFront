import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineHourglass, AiOutlineShoppingCart } from "react-icons/ai";
import { NavLink, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Footer from "./Footer";
import { useFetch } from "./Landing";
import { Tnavbar } from "./Navbar";
import { FaArrowCircleUp } from "react-icons/fa";
import Swal from "sweetalert2";
import { useCart} from '../../context/CartContext'
const Scroll = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    const scroll = document.documentElement.scrollTop;
    if (scroll > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);
  return (
    <button className={`${visible ? "block" : "hidden"}`}>
      <FaArrowCircleUp
        onClick={scrollTop}
        className="fixed bottom-0 right-5 text-5xl text-end animate-bounce text-[#1cda7b]"
      />
    </button>
  );
};
const WebProduct = () => {
  const {cart} = useCart();
  console.log(cart);
  const [items, setItems] = useState('');
  useEffect(()=>{
    const data = window.localStorage.getItem('cart');
    if(data !== null) setItems(JSON.parse(data));
  },[])
  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(items));
  },[items])
  
  const handleItem1 = (e)=>{
    e.preventDefault();
    // const 
    setItems([...items, +e.target.id])    
  }
  const [search, setSearch] = useState("");
  const [id, setId] = useState();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);
  const {data, isLoading} = useFetch("http://127.0.0.1:8000/api/categories");
  const store = data && data.filter((e)=> e.prand == "Store")
  const subCategory = data && store.map((e)=>e.sub_category);
  const asd = [];
  subCategory && subCategory.map((e)=>e.map((x)=>asd.push(x.id)));
  const findProduct = product.filter((e) => e.sub_category_id  === +id);
  const pro = product && product.filter(el =>asd.includes(el.sub_category_id));
  const filterMainProduct = useMemo(
    () => pro.filter((e) => e.nameEn.toLowerCase().includes(search)),
    [pro, search]
  );
  const filterFindProduct = useMemo(
    () => findProduct.filter((e) => e.nameEn.toLowerCase().includes(search)),
    [findProduct, search]
  );  
 
  return (
    <div>
      <Tnavbar />
      <div className="grid lg:grid-cols-12 mb-4">
        <div className=" lg:col-span-10 lg:col-start-3 items-center p w-full text-2xl pl-2 pr-3  ">
          <input
            type="text"
            className="w-full py-3  rounded-xl px-2 my-2 outline-none shadow-md border focus:border-green-400"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {isLoading ? (
          <AiOutlineHourglass className="text-black mx-auto text-4xl animate-spin" />
        ) : (
          <div className="lg:col-span-12 grid lg:grid-cols-12 gap-8 pb-5">
            <div className="ml-3 col-span-2 space-y-4 py-4 border px-2 rounded-xl shadow-lg capitalize">
              <NavLink  
                    onClick={() => setId(0)}
                    className="shadow-md p-3 hover:bg-[#0b0423] rounded-md hover:text-white block transition-colors duration-300">
                    all
              </NavLink>
              {subCategory.map((e)=>e.map((x)=>(
                <NavLink
                  key={x.id}
                  onClick={() => setId(x.id)}
                  className="shadow-md p-3 hover:bg-[#0b0423] rounded-md hover:text-white block transition-colors duration-300">
                  {x.subCategoryEn}
                </NavLink>
              )))}
              
            </div>
            <div className="col-span-10 border shadow-lg pb-5 rounded-xl mr-3 grid lg:grid-cols-12 gap-8 text-xl capitalize h-fit ">
              {findProduct.length
                ? filterFindProduct.map((e) => (
                  <div 
                  className="hover:scale-110 duration-500 lg:col-span-4 lg:mx-auto lg:items-center shadow-lg w-[40vh] pb-3 my-4 rounded-2xl overflow-hidden space-y-1"
                  key={e.id}
                  >
                    <Link to={`/product/${e.id}`}>
                      {e.images.map((x, i)=>(
                          i == 0 && <LazyLoadImage
                          src={x.image}
                          className="w-fit h-44 mx-auto py-3"
                          key={i}
                        /> 
                      ))}
                    </Link>
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-2xl">{e.nameEn}</h1>
                    </div>
                    <h1>price: {e.price} EG</h1>
                    <h1>
                      stock:{" "}
                      {e.amount > 0 ? (
                        <span>available</span>
                      ) : (
                        <span>not available</span>
                      )}
                    </h1>
                    <h1>
                      description: {e.descriptionEn.slice(0, 50)}
                    </h1>
                    <div className="px-1 flex justify-between items-center py-2">
                      <button 
                        onClick={
                          ()=>{
                            increaseCart(e.id, e.name, e.price, e.images[0].image);
                            Swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: 'Added To Cart Successfully',
                              showConfirmButton: true,
                              timer: 1000
                            })
                          }
                        } 
                      
                      
                      id={e.id}  className="flex items-center justify-between bg-[#0b0423] px-3 py-1 rounded-lg text-white hover:bg-[#1cda7b] duration-300 transition-colors ">
                        {" "}
                        add to cart <AiOutlineShoppingCart />
                      </button>
                      <Link className="bg-[#0b0423]  px-3 py-1 rounded-lg text-white hover:bg-[#1cda7b] duration-300 transition-colors ">
                        buy now
                      </Link>
                    </div>
                </div>
                  ))
                : filterMainProduct.map((e) => (
                    <div 
                      className="hover:scale-110 duration-500 lg:col-span-4 lg:mx-auto lg:items-center shadow-lg w-[40vh] pb-3 my-4 rounded-2xl overflow-hidden space-y-1"
                      key={e.id}
                      >
                        <Link to={`/product/${e.id}`}>
                          {e.images.map((x, i)=>(
                              i == 0 && <LazyLoadImage
                              src={x.image}
                              className="w-fit h-44 mx-auto py-3"
                              key={i}
                            /> 
                          ))}
                        </Link>
                        <div className="flex justify-between items-center">
                          <h1 className="font-semibold text-2xl">{e.nameEn}</h1>
                        </div>
                        <h1>price: {e.price} EG</h1>
                        <h1>
                          stock:{" "}
                          {e.amount > 0 ? (
                            <span>available</span>
                          ) : (
                            <span>not available</span>
                          )}
                        </h1>
                        <h1>
                          description: {e.descriptionEn.slice(0, 50)}
                        </h1>
                        <div className="px-1 flex justify-between items-center py-2">
                          <Link onClick={handleItem1} id={e.id}  className="flex items-center justify-between bg-[#0b0423] px-3 py-1 rounded-lg text-white hover:bg-[#1cda7b] duration-300 transition-colors ">
                            {" "}
                            add to cart <AiOutlineShoppingCart />
                          </Link>
                          <Link className="bg-[#0b0423]  px-3 py-1 rounded-lg text-white hover:bg-[#1cda7b] duration-300 transition-colors ">
                            buy now
                          </Link>
                        </div>
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>
      <Scroll />
      <Footer />
    </div>
  );
};
export default WebProduct;
