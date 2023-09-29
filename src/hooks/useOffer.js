import { useState, useCallback, useEffect } from "react";
const localCache = {};

const useOffer = (id) =>{
    const [dataOffer, setData] =useState([]);
    const fetchData = useCallback(async ()=>{
        const res = await fetch('http://127.0.0.1:8000/api/Offers');
        const json = await res.json();
        localCache["offers"] = json || [];
        setData(localCache["offers"]);
    },[])
    
    useEffect(()=>{
        if(localCache["offers"]) {
            setData(localCache["offers"])
        }else {
            fetchData();
        }
    }, [fetchData]);
    
    const filterData = dataOffer.filter( e => e.category_offer_id == id)
    return {
        dataOffer,
        filterData
        
    }
}

export default useOffer;