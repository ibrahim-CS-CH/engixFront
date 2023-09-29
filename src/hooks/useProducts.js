import { useState, useCallback, useEffect } from "react";

const localCache = {};

const useProduts = ()=>{
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const fetchProducts = useCallback(async()=>{
        const res = await fetch('http://127.0.0.1:8000/api/products');
        const json = await res.json();
        localCache["product"] = json || [];
        setData(localCache["product"])
    },[data])
    const fetchCategories = useCallback(async()=>{
        const res = await fetch('http://127.0.0.1:8000/api/categories');
        const json = await res.json();
        localCache[category] = json || [];
        setCategory(localCache[category]);
    },[data])
    const fetchSubCategories = useCallback(async()=>{
        const res = await fetch('http://127.0.0.1:8000/api/subcats');
        const json = await res.json();
        localCache["sub"] = json || [];
        setSubCategory(localCache["sub"]);
    },[])

    useEffect(()=>{
        if(localCache["product"]) {
            setData(localCache["product"]);
        } else {
            fetchProducts();
        }
    },[fetchProducts])

    useEffect(()=>{
        if(localCache[category]) {
            setCategory(localCache[category])
        } else {
            fetchCategories();
        }
    },[fetchCategories])

    useEffect(()=>{
        if(localCache["sub"] ) {
            setSubCategory(localCache["sub"] )
        } else {
            fetchSubCategories();
            
        }
    },[fetchSubCategories])
    
    return {
        data,
        category,   
        subCategory,
        setData
    }
}


export default useProduts;