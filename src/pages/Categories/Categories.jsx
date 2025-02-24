import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function Categories() {
  function getallCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

 const {data} = useQuery({
  queryKey: ["Categories"],
  queryFn: getallCategories,
  select : (res) => res.data.data
 })

  return (
    <div>
      <h1 className='text-3xl font-bold text-center my-6'>Categories</h1>
      <div className='grid grid-cols-3 gap-6 px-10'>
        {
          data?.map((category, index) => {
            return (
              <div 
                key={index} 
                className='bg-white shadow-md rounded-lg overflow-hidden p-6 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg'>
                <img src={category.image} alt={category.name} className='w-full h- object-cover' />
                <h3 className='text-xl font-semibold text-black text-center mt-4'>{category.name}</h3>
              </div>
            )
          }) 
        }
      </div>
    </div>
  )
}


