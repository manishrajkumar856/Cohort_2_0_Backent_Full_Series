import React, { useState } from 'react'
import '../styles/form.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // Custom Hooks
    const { handleLogin, loading } = useAuth();

    
    function handleSubmit(e){
        e.preventDefault();       

        handleLogin(username, password)
        .then( res => {
            console.log(res);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    if(loading){
        return <h1>
            Loading....
        </h1>
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={(e)=> setUsername(e.target.value)} type="text" name='username' placeholder='Enter your username' />
                <input onChange={(e)=> setPassword(e.target.value)} type='password' name='password' placeholder='Password' />
                <button type='submit'>Submit</button>
            </form>
            <p>Don't have an account? <Link className='toggleAuthForm' to="/register" >Register</Link></p>
        </div>
    </main>
  )
}

export default Login