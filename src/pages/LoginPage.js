import React, { useState } from 'react';
import validate from '../helpers/validate';


function Login(props) {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    function changeHandler(event) {
        const name = event.target.name;
        const value = event.target.value;
        if(name === "username") {
            setUsername(value);
        } 
        if(name === "password") {
            setPassword(value);
        }
    }

    function submitHandler(event) {
        event.preventDefault();
        // console.log(`Username: ${username}, Password: ${password}`);
        validate(username,password,props);
    }

    return (
        <div className="h-screen bg-gray-50 text-gray-400 flex justify-center font-body">
            <form onSubmit={submitHandler} 
                className="bg-white 
                            w-11/12
                            min-h-full 
                            m-auto 
                            rounded-md
                            shadow-md  
                            px-4
                            pb-16 
                            pt-14 
                            sm:p-16 
                            sm:pt-12 
                            sm:h-auto
                            sm:max-w-lg
                            flex 
                            flex-col 
                            justify-center">
                <div className="font-extrabold text-3xl text-blue-900">Sign up.</div>
                <div className="flex flex-col mt-4">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username"
                        value={username} 
                        onChange={changeHandler} 
                        className="input-box">
                    </input>
                </div>

                <div className="flex flex-col mt-4">
                    <label htmlFor="password" className="form-label"> Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password"
                        value={password} 
                        onChange={changeHandler} 
                        className="input-box">
                    </input>
                </div>
                <button type="submit" className="submit-button mt-7 hover:bg-blue-800">
                    Login
                </button>
            </form>            
        </div>
    )
}

export default Login
