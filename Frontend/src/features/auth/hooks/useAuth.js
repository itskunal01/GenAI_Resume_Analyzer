import {useContext,useEffect} from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, logout, register, getMe } from "../services/auth.api.js";







export const useAuth = () => {

    const  context = useContext(AuthContext)
    const {user,setuser,loading,setloading} = context

    
    const handleLogin = async (email,password) => {
        setloading(true)
        try{
            const data = await login({email,password})
            setuser(data.user)
            return data
        }catch(error){
            console.error("Error occurred while logging in:", error)
            return null
        }finally{
            setloading(false)
        } 
        
    }

    const handleRegister = async (username,email,password) => {
        setloading(true)
        try{
            const data = await register({username,email,password})
            setuser(data.user)
            return data
        }catch(error){
            console.error("Error occurred while registering:", error)
            return null
        }finally{
            setloading(false)
        }
        
        
        
    }

    const handleLogout = async () => {
        setloading(true)
        try{
            const data = await logout()
        setuser(null)
        } catch(error){
            console.error("Error occurred while logging out:", error)
        }finally{
            setloading(false)
        }
        
        
    }


  useEffect(()=>{

        const getAndSetUser = async () => {
            try{
                const data = await getMe()
                setuser(data.user)
            }catch(err){}finally{    
            setloading(false)
            }
        }

        getAndSetUser()
    },[])




    return{
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout
    }

}