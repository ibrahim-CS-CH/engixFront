import React from 'react'
import { useFetch } from './Landing'

const Products = () => {
    const {data} = useFetch('http://127.0.0.1:8000/api/products');

  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default Products