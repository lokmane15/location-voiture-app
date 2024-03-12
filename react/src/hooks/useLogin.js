import { useState } from "react"
import useAuthContext from "./useAuthContext";

export default function useLogin(){

    const [isLoading,setIsLoding]=useState(false);
    const [error,setError]=useState(false);
    const {dispatch}= useAuthContext()

    const baseUrl = 'http://127.0.0.1:8000/api'; 
    const login = async (email,password)=>{
        setIsLoding(true)
        setError(null)

        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email,password })
        });

        const json =await response.json() 
        if (!response.ok) {
            setIsLoding(false);
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json))

            dispatch({type: "LOGIN" , payload: json})
            setIsLoding(false)
        }
    }
    return {login,isLoading,error}
}