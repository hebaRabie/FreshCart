import React, { useState } from 'react';
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Address() {
  const [isLoading, setIsLoading] = useState(false);
  const { cartID } = useParams();

  const initialValues = {
    details: "stad Tanta str.",
    city: "tanta",
    phone: "01097553360"
  };

  async function checkout() {
    setIsLoading(true);
    const {data} = await axios.post("ecommerce.routemisr.com/api/v1/orders/checkout-session/" + cartID,{
        shippingAddress:values
    },{
        headers:{
            token:localStorage.getItem("token")
        },
        params:{
            url:"http://localhost:5173"
        }
    })
    
    location.href = data.session.url;
    setIsLoading(false);
  }

  const validationSchema = Yup.object({
    details: Yup.string().required("Details is required"),
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
  });

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      onSubmit: checkout,
      validationSchema
    });

  return (
    <div className="sm:w-2/3 mx-auto">
      <h1 className="text-3xl font-bold">Enter Your Address</h1>
      <form onSubmit={handleSubmit}>
        <div className="py-5 grid md:grid-cols-2 gap-4">
          <Input
            isInvalid={touched.details && errors.details}
            errorMessage={errors.details}
            name="details"
            value={values.details}
            onChange={handleChange}
            onBlur={handleBlur}
            className="md:col-span-2"
            label="Details"
            type="text"
            variant="bordered"
          />
          <Input
            isInvalid={touched.city && errors.city}
            errorMessage={errors.city}
            name="city"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            className="md:col-span-2"
            label="City"
            type="text"
            variant="bordered"
          />
          <Input
            isInvalid={touched.phone && errors.phone}
            errorMessage={errors.phone}
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className="md:col-span-2"
            label="Phone"
            type="tel"
            variant="bordered"
          />
          <Button
            disabled={isLoading}
            type="submit"
            className="md:col-span-2"
            isLoading={isLoading}
            color="primary"
          >
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
}


