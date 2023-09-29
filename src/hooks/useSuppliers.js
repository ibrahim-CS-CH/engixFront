import { useState, useCallback, useEffect } from "react";
const localCache = {};

const useSupplier = () =>{
    const [data, setData] =useState([]);
    const fetchData = useCallback(async ()=>{
        const res = await fetch('http://127.0.0.1:8000/api/suppliers');
        const json = await res.json();
        localCache["supplier"] = json || [];
        setData(localCache["supplier"]);
    },[])
    useEffect(()=>{
        if(localCache["supplier"]) {
            setData(localCache["supplier"])
        }else {
            fetchData();
        }
    }, [fetchData])
    return {
        data,
        setData
    }
}

export default useSupplier;