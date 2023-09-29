import { useState, useCallback, useEffect, useMemo } from "react";
const localCache = {};

const useSubcats = () =>{
    const [subCatsData, setData] =useState([]);
    const fetchData = useCallback(async ()=>{
        const res = await fetch('http://127.0.0.1:8000/api/subcats');
        const json = await res.json();
        localCache["subCats"] = json || [];
        setData(localCache["subCats"]);
    },[])
    
    useEffect(()=>{
        if(localCache["subCats"]) {
            setData(localCache["subCats"])
        }else {
            fetchData();
        }
    }, [fetchData]);
    
    return {
        subCatsData
    }
}

export default useSubcats;