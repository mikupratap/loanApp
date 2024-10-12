import React from "react";
import './params.css'
import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
const Params=()=>{
    const navigate=useNavigate();
    const [loan,setLoan]=useState("");
    const[interest,setInterest]=useState("");
    const[date,setDate]=useState("");
    useEffect(()=>{
        const str=localStorage.getItem("myappobj");
        if(!str){
            navigate("/login");
        }
        const obj=JSON.parse(str);
        if(!obj.isLogin){
            navigate("/login");
        }

    },[])

    const handleSubmit=(e)=>{
        if(!loan||Number.isNaN(loan)){
            window.alert("Please Enter valid Loan ammount")
        }
        else if(!interest||Number.isNaN(interest)){
            window.alert("Please Enter valid Loan interest")
        }
        else if(!date){
            window.alert("Please Enter valid Loan Date")
        }
        else{
            const obj=JSON.parse(localStorage.getItem("myappobj"));
            obj.totalamt=loan;
            obj.principle=loan;
            obj.setInterest=0;
            obj.rate=interest/30;
            obj.date=date;
            obj.lastDate=date;
            localStorage.setItem("myappobj",JSON.stringify(obj));
            navigate("/")
        }
    }
    return(
        <div className="params-cont">
            <div className="params-main">
                <div className="params-main-heading">
                    Enter the fields
                </div>
                <div className="params-main-div">
                    <div className="params-main-div-first">
                        <div className="params-main-div-first-up">Loan Ammount</div>
                        <div className="params-main-div-first-dwn"><input type="text" placeholder="Enter Loan ammount" value={loan} onChange={(e)=>{
                            setLoan(e.target.value);
                        }}/></div>
                    </div>
                    <div className="params-main-div-first">
                        <div className="params-main-div-first-up">Loan Date</div>
                        <div className="params-main-div-first-dwn"><input type="date" value={date} onChange={(e)=>{
                            setDate(e.target.value);
                        }}/></div>
                    </div>
                    <div className="params-main-div-first">
                        <div className="params-main-div-first-up">Interest Rate</div>
                        <div className="params-main-div-first-dwn"><input type="text" placeholder="Enter Loan interest" value={interest} onChange={(e)=>{
                            setInterest(e.target.value)
                        }}/></div>
                    </div>
                </div>
                <div className="params-main-buttons">
                    <div className="params-main-buttons-cancle">
                        <button onClick={()=>{
                            setDate("");
                            setInterest("")
                            setLoan("");
                            navigate('/')
                        }} 
                    >Cancle</button>
                    </div>
                    <div className="params-main-buttons-submit">
                        <button onClick={(e)=>{
                            handleSubmit(e);
                        }}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Params;