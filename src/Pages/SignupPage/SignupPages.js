import React, { useEffect } from "react";
import './SignupPage.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignupPage=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [cpassword,setCpassword]=useState("");
    const navigate=useNavigate();
    
    const obj={
        email:"",
        password:"",
        totalamt:0,
        interest:0,
        principle:0,
        rate:0,
        date:"",
        lastDate:"",
        islogin:false,
        totalPaid:0,
        records:[
            // {
            //     index:1,
            //     payDate:"",
            //     payAmmount:"",
            //     days:"",
            //     currInt:"",
            //     currP:"",
            //     totalInt:""
            // }
        ]
        
    }
    const handleLogin=()=>{
        navigate("/login");
    }
    const handleSubmit=()=>{
        if(!email){
            window.alert("Please Enter Eamil");
        }
        else if(!password){
            window.alert("Please enter password");
        }
        else if(!cpassword){
            window.alert("Please enter Confirm password")
        }
        else{
            if(password!=cpassword){
                window.alert("Please enter both password same")
                return
            }
            obj.email=email;
            obj.password=password;
            if(localStorage.getItem("myappobj")){
                localStorage.removeItem("myappobj");
            }
            localStorage.setItem("myappobj",JSON.stringify(obj))
            window.alert("User Signup Successfully");
            navigate("/login")
            //localStorage.setItem("myapppassword",)
        }
    }
    return (
        <div className="signup-cont">
            <div className="signup-main">
                <div className="signup-email">
                    <div  className="signup-email-heading">
                        Email
                    </div>
                    <div  className="signup-email-input">
                        <input type="text" placeholder="enter your email" value={email} onChange={(e)=>{
                            setEmail(e.target.value);
                        }}/>
                    </div>
                </div>

                <div className="signup-password">
                    <div  className="signup-password-heading">
                        Password
                    </div>
                    <div  className="signup-password-input">
                        <input type="password" placeholder="enter your password" value={password} onChange={(e)=>{
                            setPassword(e.target.value)
                        }}/>
                    </div>
                </div>
                <div className="signup-password">
                    <div  className="signup-password-heading">
                        Confirm Password
                    </div>
                    <div  className="signup-password-input">
                        <input type="password" placeholder="enter your password again" value={cpassword} onChange={(e)=>{
                            setCpassword(e.target.value)
                        }}/>
                    </div>
                </div>
                <div className="signup-buttons">
                    <div className="login-signup">
                        <p onClick={()=>{
                            handleLogin();
                        }}>Already have account</p>
                    </div>
                    <div className="signup-button">
                        <button onClick={()=>{
                            handleSubmit();
                        }}>signup</button>
                    </div>
                </div>

            </div>
            
        </div>
    )
}
export default SignupPage;