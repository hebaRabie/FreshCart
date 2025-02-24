import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../../Components/Product/Product';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';

export default function Home() {
  const [products, setProducts] = useState([]);
  const[isLoding, setIsLoggedIn]= useState(true)

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    setIsLoggedIn(true);
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setProducts(data.data);
      setIsLoggedIn(false);
  }

  if(isLoding){
    return <LoadingScreen/>
  }

  return (
   <div>
    <div className='grid grid-cols-4 gap-3'>
      {
        products.map((product, index) => {
          return <Product key={index} product={product} />
        })
      }
    </div>
   </div>
  )
}


