import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../contexts/authContext';
import axios from 'axios';

export default function Orders() {
    const {UserId} = useContext(authContext);
    const {Orders,setOrders} = useState([]);

useEffect(()=>{
    getUserOrders()
},[])


    async function getUserOrders(){
        const {data} =await axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/" + UserId)
        setOrders(data);

    }


  return (
    <div>
        {
            Orders.map((Order)=>{

            })
        }
    </div>
  )
}
