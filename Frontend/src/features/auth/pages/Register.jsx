import React,{useState} from 'react'
import {useNavigate,Link} from 'react-router'
import {useAuth} from '../hooks/useAuth' 

const Register = () => {


        const navigate = useNavigate()
        const [username, setusername] = useState("")
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")

        const {loading,handleRegister} = useAuth()

        const handleSubmit = async (e)=>{
        e.preventDefault()
        await handleRegister(username,email,password)
        navigate("/")
    }

    
    if(loading){
        return(<main><h1>Loading.....</h1></main>)
    }




  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>

            <div className="input-group">
                <label htmlFor="username">UserName</label>
                <input 
                onChange={(e)=>{setusername(e.target.value)}}
                type ="text" name="username" id="username" placeholder='Enter your username' />
            </div> 


             <div className="input-group">
                <label htmlFor="email">Email</label>
                <input 
                onChange={(e)=>{setEmail(e.target.value)}}
                type ="email" name="email" id="email" placeholder='Enter your email' />
            </div>   

            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input 
                onChange={(e)=>{setPassword(e.target.value)}}
                type ="password" name="password" id="password" placeholder='Enter your password' />
            </div>


            <button className='button primary-button'>Register</button>

            </form>

            <p>Already have an account? <Link to={"/login"}>Login</Link> </p>
        </div>
    </main>
  )
}

export default Register