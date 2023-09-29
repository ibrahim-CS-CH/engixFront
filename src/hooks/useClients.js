import { useState, useCallback, useEffect } from "react";
const localCache = {};

const useClients = () =>{
    const [data, setData] =useState([]);
    const fetchData = useCallback(async ()=>{
        const res = await fetch('http://127.0.0.1:8000/api/ourclients');
        const json = await res.json();
        localCache["Clients"] = json || [];
        setData(localCache["Clients"]);
    },[])
    
    useEffect(()=>{
        if(localCache["Clients"]) {
            setData(localCache["Clients"])
        }else {
            fetchData();
        }
    }, [fetchData])
    return {
        data,
        setData
    }
}

export default useClients;