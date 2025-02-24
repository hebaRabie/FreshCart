import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null);

  function getallBrands(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }

  const {data} = useQuery({
    queryKey: ["Brands"],
    queryFn: getallBrands,
    select : (res) => res.data.data
  })

  return (
    <div>
      <h1 className='text-3xl font-bold text-center my-6 text-black'>All Brands</h1>
      <div className='grid grid-cols-3 gap-6 px-10'>
        {
          data?.map((Brand, index) => {
            return (
              <div 
                key={index} 
                className='bg-white shadow-lg rounded-lg overflow-hidden p-8 border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-xl w-full h-[400px] flex flex-col items-center justify-center cursor-pointer'
                onClick={() => setSelectedBrand(Brand)}
              >
                <img src={Brand.image} alt={Brand.name} className='w-full h-[250px] object-contain' />
                <h3 className='text-2xl font-semibold text-black text-center mt-4'>{Brand.name}</h3>
              </div>
            )
          }) 
        }
      </div>

      {selectedBrand && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-[400px]'>
            <button className='absolute top-2 right-2 text-xl' onClick={() => setSelectedBrand(null)}>×</button>
            <h2 className='text-2xl font-bold text-black'>{selectedBrand.name}</h2>
            <img src={selectedBrand.image} alt={selectedBrand.name} className='w-full h-auto object-contain my-4'/>
            <p className='text-gray-600'>{selectedBrand.name.toLowerCase()}</p>
            <button className='mt-4 bg-gray-500 text-white px-4 py-2 rounded' onClick={() => setSelectedBrand(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}


