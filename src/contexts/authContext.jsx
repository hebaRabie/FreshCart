import { createContext, useState,useEffect } from "react";
import axios from "axios";




 export const authContext = createContext()


export default function AuthContextProvider({children}){

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") != null);
    const [UserId,setUserId] = useState("")

   

     useEffect(() => {
        if (localStorage.getItem("token") != null) {
          verifyToken();
        }
      }, []);



    function verifyToken(){
        axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken",{
            headers: {
                token : localStorage.getItem("token")
            }
        }).catch((err)=>{
            localStorage.removeItem("token");
            setIsLoggedIn(false);
           
        }).then(({data})=>{
            setUserId(data.decoded.id);
        })
    }

    return<authContext.Provider value={{isLoggedIn, setIsLoggedIn,UserId}}>
       {children}
    </authContext.Provider>
}