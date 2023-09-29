import { useState, useEffect, useCallback } from "react";

const localCache = {};
const useSlider = ()=>{
    const [data, setData] = useState([]);

    const fetchData = useCallback(async()=>{
        const res = await fetch('http://127.0.0.1:8000/api/sliders');
        const json = await res.json();
        localCache["slider"] = json || [];
        setData(localCache["slider"]);
    }, [])

    useEffect(()=>{
        if (localCache["slider"]) {
            setData(localCache["slider"])
        }else {
            fetchData();
        }
    }, [fetchData])

    return {
        data
    }
}
export default useSlider;