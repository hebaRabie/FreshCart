import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './Layouts/MainLayout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Notfound from './pages/Notfound/Notfound'
import Brands from './pages/Brands/Brands'
import Categories from './pages/Categories/Categories'
import Cart from './pages/Cart/Cart'
import CounterContextProvider from './contexts/counterContext';
import AuthContextProvider from './contexts/authContext';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute'
import ProtectedAuthRoute from './ProtectedRoutes/ProtectedAuthRoute'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify';
import Address from './pages/Address/Address'
import Orders from './pages/Orders/Orders'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
 
 const router = createHashRouter([
  {path: '', element: <MainLayout/>, children:[
    {index: true, element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path: '/login', element: <ProtectedAuthRoute><Login/></ProtectedAuthRoute>},
    {path: '/Register', element: <ProtectedAuthRoute><Register/></ProtectedAuthRoute>},
    {path: '/Cart', element: <ProtectedRoute><Cart/></ProtectedRoute>},
    {path: '/Brands', element: <ProtectedRoute><Brands/></ProtectedRoute>},
    {path: '/allorders', element: <ProtectedRoute><Orders/></ProtectedRoute>},
    {path: '/Categories', element: <ProtectedRoute><Categories/></ProtectedRoute>},
    {path: '/Address/:cartID', element: <ProtectedRoute><Address/></ProtectedRoute>},
    {path: '/ProductDetails/:id', element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path: '*', element: <Notfound />},
    
  ]
}
])
  return (
    <>
    <QueryClientProvider client={queryClient}>
       <AuthContextProvider>
       <CounterContextProvider>
       <RouterProvider router={router}></RouterProvider>
       <ToastContainer/>
       </CounterContextProvider>
       </AuthContextProvider>
    </QueryClientProvider>
    </>
  )
}

export default App


