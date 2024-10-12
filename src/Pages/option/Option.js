import React from "react";
import { useNavigate } from "react-router-dom";
import './Option.css';
const Option=()=>{
    const navigate=useNavigate();
    let objTemp={
        email:"",
        password:"",
        totalamt:0,
        interest:0,
        principle:0,
        rate:0,
        date:"",
        lastDate:"",
        islogin:true,
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
    const handleSubmit=()=>{
        const str=localStorage.getItem("myappobj");
        const obj=JSON.parse(str);
        objTemp.email=obj.email;
        objTemp.password=obj.password;
        localStorage.setItem("myappobj",JSON.stringify(objTemp));

        console.log("kkk ",localStorage.getItem("myappobj"));
        navigate('/login')
    }
    return(
        <div className="option-cont">
            <div className="option-main">
                <button id="option-main-btn1" onClick={()=>{
                    handleSubmit();
                }}>Reset Data</button>
                <button id="option-main-btn2" onClick={()=>{
                    navigate('/login')
                }}>Log Out</button>
                <button id="option-main-btn3" onClick={()=>{
                    navigate('/')
                }}>Back</button>
            </div>
        </div>
    )
}
export default Option;