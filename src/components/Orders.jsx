import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { AiFillEdit, AiOutlineHourglass } from "react-icons/ai";
import { BiShowAlt } from "react-icons/bi";
import Swal from "sweetalert2";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const Orders = () => {
  const [filter, setFilter] = useState("all");
  const [padiFilter, setPaidFilter] = useState("all");
  const [customer, setCustomer] = useState("all");
  const [value, onChange] = useState(new Date(new Date().getFullYear(), 0, 1));
  const [value2, onChange2] = useState(new Date());
  const [state, setState] = useState(false);
  const [paid, setPaid] = useState(false);
  const [details, setDetails] = useState({});
  const [change, setChange] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const language = true;
  const fetchOrders = async () => {
    setIsLoading(true);
    const fetchData = await fetch("http://127.0.0.1:8000/api/orders");
    const json = await fetchData.json();
    setOrders(json);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchOrders();
  }, [change, paid]);

  const cancelOrder = async (id, status) => {
    const sendStatus = await fetch(
      `http://127.0.0.1:8000/api/orders/update/${+status}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: id,
        }),
      }
    );
    const response = await sendStatus.json();
    response.status === true && setState(!state);
    response.status === true && setChange(!change);

    return response;
  };
  const commissionMethods = async (id, status) => {
    const sendStatus = await fetch(
      `http://127.0.0.1:8000/api/orders/user/commissionState/${+status}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commission_status: id,
        }),
      }
    );
    const response = await sendStatus.json();
    response.status === true && setPaid(!paid);
    // response.status === true && setChange(!change);

    return response;
  };

  const handleStatusCOM = (e, id) => {
    Swal.fire({
      title: `Are you sure to ${e} order?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        commissionMethods(e, id).then((data) => {
          data.status === true
            ? Swal.fire("updated!", "Your order has been updated.", "success")
            : Swal.fire(
                "Oops!",
                "Something went wrong, please try again later",
                "error"
              );
        });
      }
    });
  };
  const handleStatus = (e, id) => {
    Swal.fire({
      title: `Are you sure to ${e} order?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelOrder(e, id).then((data) => {
          data.status === true
            ? Swal.fire("updated!", "Your order has been updated.", "success")
            : Swal.fire(
                "Oops!",
                "Something went wrong, please try again later",
                "error"
              );
        });
      }
    });
  };
  const handleDetails = (e) => {
    console.log(e);
  };
  const inprogress = "inprogress";
  const cancel = "cancel";
  const done = "done";
  const indeliver = "indeliver";

  const [show, setShow] = useState(false);
  const ShowDetails = (props) => {
    const { setShow } = props;
    return (
      <>
        <div
          className="absolute border w-full bg-black opacity-90 h-full top-0"
          onClick={() => {
            setShow(false);
            setDetails({});
          }}></div>
        <div className="text-white absolute w-full top-[40%] text-1xl">
          {language ? (
            <div className="border border-green-300 lg:w-4/6 w-fit mx-auto lg:block flex overflow-auto">
              <div>
                <h1>{details?.clientData?.name && `name: ${details?.clientData?.name}`}</h1>
                <h1>{details?.clientData?.email && `email: ${details?.clientData?.email}`}</h1>
                <h1>{details?.clientData?.phone && `phone: ${details?.clientData?.phone}`}</h1>
                <h1>{details?.clientData?.phone2 && `phone2: ${details?.clientData?.phone2}`}</h1>
                <h1>{details?.clientData?.address1 && `address1: ${details?.clientData?.address1}`}</h1>
                <h1>{details?.clientData?.address2 && `address2: ${details?.clientData?.address2}`}</h1>
                <h1>{details?.clientData?.note && `note: ${details?.clientData?.note}`}</h1>

              </div>
              <div className=" grid lg:grid-cols-6  border font-real font-semibold capitalize px-2 ">
                <h1 className="">bill num</h1>
                <h1 className="">product</h1>
                <h1 className="">amount</h1>
                <h1 className="">price</h1>
                <h1 className="">commission</h1>
                <h1 className="">brand</h1>
              </div>
              {details?.orderDetails?.map((e) => (
                <div
                  key={e.id}
                  className="gap-0 grid lg:grid-cols-6 border font-real font-semibold capitalize px-2">
                  <h1 className="">{e.order_id}</h1>
                  <h1 className="mr-4">{e.product?.nameEn}</h1>
                  <h1 className="">{e.amount}</h1>
                  <h1 className="">{e.price}</h1>
                  <h1 className="">{e.commission}</h1>
                  <h1 className="">{e.product?.brand}</h1>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-green-300 lg:w-4/6 w-fit mx-auto lg:block flex  overflow-auto">
              <div className=" text-end grid lg:grid-cols-6 border font-real font-semibold capitalize px-2 overflow-auto">
                <h1 className="">النوع</h1>
                <h1 className="">العمولة</h1>
                <h1 className="">الكمية</h1>
                <h1 className="">السعر</h1>
                <h1 className="">المنتج</h1>
                <h1 className="">رقم الفاتورة</h1>
              </div>
              {details?.map((e) => (
                <div
                  key={e.id}
                  className="text-end  items-center gap-0 grid lg:grid-cols-6 border font-real font-semibold capitalize px-2 overflow-auto">
                  <h1 className="">{e.product?.brand}</h1>
                  <h1 className="">{e.commission}</h1>
                  <h1 className="">{e.amount}</h1>
                  <h1 className="">{e.price}</h1>
                  <h1 className="ml-4">{e.product?.nameAr}</h1>
                  <h1 className="">{e.order_id}</h1>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  };
  
 
const UniqueOrdersRenderer = ({ orders }) => {
  // Custom comparison function based on the 'name' property within the 'users' object
  const isUniqueByName = (value, index, self) => {
    return self.findIndex((order) => order?.user?.name === value?.user?.name) === index;
  };

  // Filter out the duplicates based on the 'name' property within the 'users' object
  const uniqueOrders = orders.filter(isUniqueByName);

  return (
    <select 
    className="border p-1 m-1"
    value={customer} onChange={(e)=>setCustomer(e.target.value)}>
      <option value={"all"}>all</option>
      {uniqueOrders.map((order) => (
        <option key={order.id} value={order?.user?.name}>{order?.user?.name}</option>
      ))}
    </select>
  );
};

const [filterAll, setFilteredData] = useState(orders);
const handleFilter = () => {
  const filteredArray = orders.filter(item => {
    // Check if the item's properties match the filter values
    const statusMatch = filter === "all" || item.status === filter;
    const commissionStatusMatch = padiFilter === "all" || item.commission_status === padiFilter;
    const customerFilter = customer === "all" || item?.user?.name === customer;
    // Check if the item's date falls within the selected date range
    const itemDate = new Date(item.created_at);
    const from = new Date(value);
    const to = new Date(value2);
    const dateRangeMatch = !value || !value2 || (itemDate >= from && itemDate <= to);
    // Return true only if all filters match (or if no filter is applied, i.e., filter is null or empty string)
    return statusMatch && commissionStatusMatch && dateRangeMatch && customerFilter;
  });

  setFilteredData(filteredArray);
};

// Call handleFilter whenever the filters change
useEffect(() => {
  handleFilter();
}, [value, value2, filter, padiFilter,orders, customer ]);
const totalCommission = filterAll?.reduce((sum, obj) => {
  if (obj.status === "done") {
    return sum + obj.total_commission;
  }
  return sum;
}, 0);
const commssionPaid = filterAll?.reduce((sum, obj) => {
  if (obj.status === "done" && obj.commission_status === "paid") {
    return sum + obj.total_commission;
  }
  return sum;
}, 0);
const commssionUnPaid = filterAll?.reduce((sum, obj) => {
  if (obj.status === "done" && obj.commission_status === "unpaid") {
    return sum + obj.total_commission;
  }
  return sum;
}, 0);

const totalPrice = filterAll?.reduce((sum, obj) => {
  if (obj.status === "done") {
    return sum + obj.total_price;
  }
  return sum;
}, 0);
const doneCount = filterAll?.reduce((count, obj) => {
  if (obj.status === "done") {
    return count + 1;
  }
  return count;
}, 0);
const deliverCount = filterAll?.reduce((count, obj) => {
  if (obj.status === "indeliver") {
    return count + 1;
  }
  return count;
}, 0);
const progressCount = filterAll?.reduce((count, obj) => {
  if (obj.status === "inprogress") {
    return count + 1;
  }
  return count;
}, 0);
const cancelCount = filterAll?.reduce((count, obj) => {
  if (obj.status === "cancel") {
    return count + 1;
  }
  return count;
}, 0);
const paidCount = filterAll?.reduce((count, obj) => {
  if (obj.commission_status === "paid") {
    return count + 1;
  }
  return count;
}, 0);
const unpaidCount = filterAll?.reduce((count, obj) => {
  if (obj.commission_status === "unpaid" && obj.status === "done") {
    return count + 1;
  }
  return count;
}, 0);
  return (
    <div>
      <section className="p-5 mx-auto">
      {show &&  <ShowDetails setShow={setShow} />}

        {isLoading && (
          <AiOutlineHourglass className="text-black mx-auto text-4xl animate-spin" />
        )}
          <div className={`capitalize p-4 items-center text-xl border flex space-x-4`}>
        <div>
          <label htmlFor="status">filter Status</label>
          <select
            className="capitalize border p-1 m-1"
            name="status"
            id="status"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}>
            <option value="all">all</option>
            <option value="done">done</option>
            <option value="cancel">cancel</option>
            <option value="indeliver">in deliver</option>
            <option value="inprogress">in progress</option>
          </select>
        </div>
        <div>
          <label htmlFor="">from</label>
          <DatePicker onChange={onChange} value={value} />
        </div>
        <div>
          <label htmlFor="">to</label>
          <DatePicker onChange={onChange2} value={value2} />
        </div>
        <div>
          <label htmlFor="comsion">commission</label>
          <select 
          className="capitalize border  p-1 m-1"

          name="comsion" id="comsion" value={padiFilter} onChange={(e)=>setPaidFilter(e.target.value)} >
            <option value="all">all</option>
            <option value="paid">paid</option>
            <option value="unpaid">unpaid</option>
          </select>
        </div>
        <div>
          <label htmlFor="customer">customer</label>
            <UniqueOrdersRenderer orders={orders}/>
        </div>
      </div>
        {orders?.length ? (
          language ? (
            <div className="lg:grid flex ">
              <div className=" grid lg:grid-cols-7 border font-real font-semibold capitalize px-2 overflow-auto">
                <h1 className="">id</h1>
                <h1 className="">price</h1>
                <h1 className="">commission</h1>
                <h1 className="">customer</h1>
                <h1 className="">status</h1>
                <h1 className="">paid</h1>
                <h1 className="">details</h1>
              </div>
              <div className="lg:grid flex">
                {filterAll.map((e) => (
                  <div
                    className="items-center grid lg:grid-cols-7  border font-real font-medium px-2 overflow-auto"
                    key={e.id}
                    id={e.id}>
                    <h1 className="border-collapse lg:border-none border-b">
                      {e.id}
                    </h1>
                    <h1 className="border-collapse lg:border-none border-b">
                      {e.total_price}
                    </h1>
                    <h1 className="border-collapse lg:border-none border-b">
                      {e.total_commission}
                    </h1>
                    <h1>{e.user?.name || "Not Found"}</h1>
                    <h1 className="border-collapse flex flex-wrap space-x-3 items-center lg:border-none border-b">
                      {e.status == cancel || e.status === done ? (
                        e.status
                      ) : (
                        <>
                          <span className={`${state ? "hidden" : "block"}`}>
                            {e.status}
                          </span>{" "}
                          <select
                            onChange={(e) => {
                              handleStatus(e.target.value, e.target.id);
                            }}
                            name="status"
                            id={e.id}
                            className={`${state ? "block" : "hidden"}`}>
                            <option id={e.id} value={cancel}>
                              {cancel}
                            </option>
                            <option id={e.id} value={done}>
                              {done}
                            </option>
                            <option id={e.id} value={inprogress}>
                              {inprogress}
                            </option>
                            <option id={e.id} value={indeliver}>
                              {indeliver}
                            </option>
                          </select>
                          <AiFillEdit
                            id={e.id}
                            className="cursor-pointer"
                            onClick={() => {
                              setState(!state);
                            }}
                          />
                        </>
                      )}
                    </h1>
                    <h1 className="border-collapse flex flex-wrap space-x-3 items-center lg:border-none border-b">
                      {e.status === "cancel" && e.commission_status}
                      {(e.status === indeliver || e.status == "inprogress") &&
                        e.commission_status}

                      {
                        e.status === "done" &&
                          (e.commission_status == "paid" ? (
                            <>{"paid"}</>
                          ) : (
                            <>
                              <span className={`${paid ? "hidden" : "block"}`}>
                                {e.commission_status}
                              </span>{" "}
                              <select
                                onChange={(e) => {
                                  handleStatusCOM(e.target.value, e.target.id);
                                }}
                                name="status"
                                id={e.id}
                                className={`${paid ? "block" : "hidden"}`}>
                                <option>select</option>
                                <option id={e.id} value="paid">
                                  paid
                                </option>
                                <option id={e.id} value="unpaid">
                                  unpaid
                                </option>
                              </select>
                              <AiFillEdit
                                id={e.id}
                                className="cursor-pointer"
                                onClick={() => {
                                  setPaid(!paid);
                                }}
                              />
                            </>
                          )) // (e.commission_status === "paid" && e.state === "done")
                        //     ? <>{e.commission_status}</>
                        // : <>
                        //  <span className={`${paid ? "hidden" : "block"}`}>{e.commission_status}</span>{" "}
                        // <select
                        //     onChange={(e)=>{
                        //         handleStatus(e.target.value, e.target.id);
                        //     }}
                        //     name="status"
                        //     id={e.id}
                        //     className={`${paid ? "block" : "hidden"}`}
                        //     >
                        //         <option id={e.id} value="paid">paid</option>
                        //         <option id={e.id} value="unpaid">unpaid</option>

                        // </select>
                        // <AiFillEdit
                        //     id={e.id}
                        //     className="cursor-pointer"
                        //     onClick={() =>{
                        //         setPaid(!paid);
                        //     }}
                        // />

                        // </>
                      }
                    </h1>

                    <h1 className="border-collapse flex  flex-wrap space-x-3 items-center lg:border-none border-b ">
                      <span>order details</span>{" "}
                      <BiShowAlt
                        className="cursor-pointer"
                        onClick={() => {
                          handleDetails(e.order_details);
                          setDetails({orderDetails:e.order_details, clientData: JSON.parse(e.client_data)});
                          setShow(true);
                        }}
                      />{" "}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="lg:grid flex flex-row-reverse">
              <div className="text-end grid lg:grid-cols-5 lg:mx-[50%] lg:w-1/2 border font-real font-semibold capitalize px-2 overflow-auto">
                <h1 className="">تفاصيل الطلب</h1>
                <h1 className="">حالة الطلب </h1>
                <h1 className="">العمولة </h1>
                <h1 className=""> السعر</h1>
                <h1 className="">الكود</h1>
              </div>

              <div className="lg:grid flex ">
                {data.map((e) => (
                  <div
                    className="items-center  text-end grid lg:grid-cols-5 lg:w-1/2 border font-real font-medium px-2 lg:mx-[50%] overflow-auto"
                    key={e.id}>
                    <h1 className="border-collapse flex  flex-wrap-reverse   justify-end lg:space-x-3 items-center ">
                      <BiShowAlt className="cursor-pointer" />{" "}
                      <span>order details</span>{" "}
                    </h1>
                    <h1 className="border-collapse flex flex-wrap-reverse justify-end space-x-3 items-center">
                      {e.status != "inprogress" ? (
                        e.status
                      ) : (
                        <>
                          <AiFillEdit
                            className="cursor-pointer"
                            onClick={() => handleStatus(e.id)}
                          />
                          <span>{e.status}</span>{" "}
                        </>
                      )}
                    </h1>
                    <h1 className="border-collapse flex justify-end">
                      <span>جم </span> {e.total_commission}
                    </h1>
                    <h1 className="border-collapse flex justify-end">
                      <span>جم</span> {e.total_price}
                    </h1>
                    <h1 className="border-collapse ">{e.id}</h1>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : (
          <>no orders yet</>
        )}
      </section>
      <div>
      <div className="w-fit grid h-fit capitalize font-real">
                <h1 className="text-xl font-semibold">orders analysis</h1>
                <div className="grid lg:grid-cols-10  text-2xl font-real">
                  <div className="border">done</div>
                  <div className="border">cancel</div>
                  <div className="border">in progress</div>
                  <div className="border">in deliver</div>
                  <div className="border overflow-hidden ">Comm ission</div>
                  <div className="border">Price</div>
                  <div className="border">paid</div>
                  <div className="border">unpaid</div>
                  <div className="border">comm paid</div>
                  <div className="border">comm unpaid</div>
                </div>
                <div className="grid lg:grid-cols-10  text-2xl font-real h-fit ">
                  <div className="border">{doneCount}</div>
                  <div className="border">{cancelCount}</div>
                  <div className="border">{progressCount}</div>
                  <div className="border">{deliverCount}</div>
                  <div className="border overflow-hidden ">
                    {totalCommission}
                  </div>
                  <div className="border">{totalPrice}</div>
                  <div className="border">{paidCount}</div>
                  <div className="border">{unpaidCount}</div>
                  <div className="border">{commssionPaid}</div>
                  <div className="border">{commssionUnPaid}</div>
                </div>
              </div>
      </div>
    </div>
  );
};

export default Orders;
