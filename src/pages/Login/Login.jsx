import React, { useState ,useContext } from 'react'
import {Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';


export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(authContext);
  const initialValues = {
    email:"",
    password:"",
}
  function onSubmit(values){
  setIsLoading(true)
  setErrMsg("")
 axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
 .then(({data})=>{
  if(data.message == "success"){
    setIsLoggedIn(true);
    localStorage.setItem("token",data.token)
    navigate("/")
  }
 }).catch((err)=>{
   setErrMsg(err.response.data.message);
 }).finally(()=>{
  setIsLoading(false)
 })


 console.log(data);
 


}
 const validationSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invaild email"),
  password: Yup.string().required("password is required").min(8,"password must be at 8 characters"),
})

  const {values,handleChange,handleSubmit,errors,touched,handleBlur} = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })
  
  return (
    <div className='sm:w-2/3 mx-auto'>
      <h1 className='text-3xl font-bold'>Login Now</h1>
     <form onSubmit={handleSubmit}>
      <div className='py-5 grid gap-4'>
      <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} name='email'value={ values.email}onChange={handleChange} onBlur={handleBlur} label="Email" type="email" variant='bordered' />
      <Input isInvalid={touched.password && errors.password} errorMessage={errors.password} name='password'value={ values.password} onChange={handleChange}onBlur={handleBlur} className='' label="Password" type="password" variant='bordered' />
      <Button disabled={isLoading} type='submit' isLoading={isLoading} color="primary">
        Login
    </Button>
    {errMsg && <p className='text-red-500 text-sm'> {errMsg}</p>}
      </div>
     </form>
    </div>
  )
}
