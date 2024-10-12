import React from "react";
import './Login.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginPage=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const handleSignup=()=>{
        navigate('/signup');
    }
    const handleSubmit=()=>{
        if(!email){
           window.alert("Please enter email");
           return 
        }
        else if(!password){
            window.alert("Please enter password");
            return 
        }
        
        const str=localStorage.getItem("myappobj");
        if(!str){
            window.alert("Not a User ,Register first")
            return ;
        }
        const obj=JSON.parse(localStorage.getItem("myappobj"));
        if(email!=obj.email){
            window.alert("You are not a user");
            return;
        }
        if(password!=obj.password){
            window.alert("Password incorrect");
            return
        }
        window.alert("User Login successfully")
        obj.isLogin=true;
        localStorage.setItem("myappobj",JSON.stringify(obj));
        navigate("/");
    }
    return (
        <div className="login-cont">
            <div className="login-main">
                <div className="login-email">
                    <div  className="login-email-heading">
                        Email
                    </div>
                    <div  className="login-email-input">
                        <input type="text" placeholder="enter your email" value={email} onChange={(e)=>{
                            setEmail(e.target.value);
                        }}/>
                    </div>
                </div>

                <div className="login-password">
                    <div  className="login-password-heading">
                        Password
                    </div>
                    <div  className="login-password-input">
                        <input type="password" placeholder="enter your password" value={password} onChange={(e)=>{
                            setPassword(e.target.value)
                        }}/>
                    </div>
                </div>
                <div className="login-buttons">
                    <div className="login-signup">
                        <p onClick={()=>{
                            handleSignup();
                        }}>Create new account</p>
                    </div>
                    <div className="login-button">
                        <button onClick={()=>{
                            handleSubmit();
                        }}>Login</button>
                    </div>
                </div>

            </div>
            
        </div>
    )
}
export default LoginPage;