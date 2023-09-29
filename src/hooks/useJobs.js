import { useState, useCallback, useEffect } from "react";
const localCache = {};

const useJobs = () =>{
    const [data, setData] =useState([]);
    const fetchData = useCallback(async ()=>{
        const res = await fetch('http://127.0.0.1:8000/api/jobs');
        const json = await res.json();
        localCache["jobs"] = json || [];
        setData(localCache["jobs"]);
    },[])
    
    useEffect(()=>{
        if(localCache["jobs"]) {
            setData(localCache["jobs"])
        }else {
            fetchData();
        }
    }, [fetchData])
    return {
        data,
        setData
    }
}

export default useJobs;