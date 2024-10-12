import React from "react";
import './Main.css';
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY))+1;
  }
const Main=()=>{
    const navigate=useNavigate();
    const [thisObject,setThisObject]=useState({});
    const [payDate,setPayDate]=useState("");
    const [payAmmount,setPayAmmount]=useState("");
    useEffect(()=>{
        const str=localStorage.getItem("myappobj");
        if(!str){
            navigate("/login");
            return
        }
        const obj=JSON.parse(str);
        if(!obj.isLogin){
            navigate("/");
            return
        }
        if(thisObject?.totalamt!=0)
        setThisObject(obj);
    },[thisObject])
    const handleLogOut=()=>{
        navigate('/options');
        return
    }
    const handleCalculate=(e)=>{
        let thisObject1=thisObject;
        if(!payAmmount||Number.isNaN(payAmmount)){
            window.alert("Enter pay ammount")
            return 
        }
        if(!payDate){
            window.alert("Enter Date");
        }
        const diff=dateDiffInDays(new Date(thisObject1.lastDate), new Date(payDate))
    let recordObj={
            index:0,
            payDate:"",
            payAmmount:"",
            days:"",
            currInt:"",
            currP:"",
            totalInt:""
        }
        recordObj.index=thisObject1.records.length+1;
        recordObj.payDate=payDate;
        recordObj.payAmmount=payAmmount;
        recordObj.days=diff;
        thisObject1.totalPaid=thisObject1.totalPaid+Number.parseInt(payAmmount);
        recordObj.currP=thisObject1.totalamt;
        recordObj.currInt=Math.round((diff*thisObject1.rate*thisObject1.totalamt)/100);
        let x=thisObject1.interest+recordObj.currInt;
        if(payAmmount>=x){
            recordObj.currP=thisObject1.totalamt-(payAmmount-x);
            recordObj.totalInt=0;
        }
        else{
            recordObj.totalInt=(thisObject1.interest+recordObj.currInt-payAmmount);
        }
        
        thisObject1.records=[recordObj,...thisObject1.records];
        thisObject1.totalamt=recordObj.currP;
        thisObject1.interest=recordObj.totalInt;
        thisObject1.lastDate=payDate;

        localStorage.setItem("myappobj",JSON.stringify(thisObject1));
        setThisObject(thisObject1);
    }
    return(
        <div className="main-cont">
            <div className="main-header">
                <div className="main-logo">
                    Logo
                </div>
                <div className="main-heading">
                    <h3>Vishal Jwellars</h3>
                </div>
                <div className="log-out">
                    <button onClick={()=>{
                        handleLogOut();
                    }}>More</button>
                </div>
            </div>
            <div className="main-description">
                Calculate Total Simple Interest
            </div>
            <div className="main-input-fields">
                <div className="main-input-fields-top">
                    <div className="main-input-fields-top-setparams">
                        <button onClick={()=>{
                            navigate('/params')
                        }}>Please Click Here to enter Loan Details</button>
                    </div>
                    <div className="main-input-fields-top-setparams">
                        <button onClick={()=>{
                            navigate('/forcepaid')
                        }}>Force Pay</button>
                    </div>
                </div>
                <div className="main-input-fields-bottom">
                    <div className="main-input-fields-bottom-first">
                        <div className="main-input-fields-bottom-first-up">Total Ammount</div>
                        <div className="main-input-fields-bottom-first-down">{thisObject.totalamt}</div>
                    </div>

                    <div className="main-input-fields-bottom-first">
                        <div className="main-input-fields-bottom-first-up">Total Interest</div>
                        <div className="main-input-fields-bottom-first-down-int">{thisObject.interest}</div>
                    </div>
                    <div className="main-input-fields-bottom-first">
                        <div className="main-input-fields-bottom-first-up">Total Paid</div>
                        <div className="main-input-fields-bottom-first-down">{thisObject.totalPaid}</div>
                    </div>
                </div>
            </div>
            <div className="main-all-records">
                <div className="main-record-history">
                    <h3>History of Records</h3>
                    </div>
                <div className="main-records">
                    {
                        thisObject.records?thisObject.records.map(i=>{
                            return<div className="main-records-item">
                                <div className="main-records-item-first">
                                    <div className="main-records-item-first-index">{i.index}</div>
                                    <div className="main-records-item-first-paydate">
                                        <div className="main-records-item-first-paydate-left">Pay Date :</div>
                                        <div className="main-records-item-first-paydate-right">{i.payDate}</div>
                                    </div>
                                    <div className="main-records-item-first-payamt">
                                    <div className="main-records-item-first-payamt-left">Pay Amt :</div>
                                    <div className="main-records-item-first-payamt-right">{i.payAmmount}</div>
                                    </div>
                                </div>
                                <div className="main-records-item-first">
                                <div className="main-records-item-first-index-1"></div>
                                    <div className="main-records-item-first-paydate">
                                        <div className="main-records-item-first-paydate-left">Days :</div>
                                        <div className="main-records-item-first-paydate-right">{i.days}</div>
                                    </div>
                                    <div className="main-records-item-first-payamt">
                                    <div className="main-records-item-first-payamt-left">Cur Int :</div>
                                    <div className="main-records-item-first-payamt-right">{i.currInt}</div>
                                    </div>
                                </div>
                                <div className="main-records-item-first">
                                    <div className="main-records-item-first-index-1"></div>
                                    <div className="main-records-item-first-paydate">
                                        <div className="main-records-item-first-paydate-left">Total P :</div>
                                        <div className="main-records-item-first-paydate-right">{i.currP}</div>
                                    </div>
                                    <div className="main-records-item-first-payamt">
                                    <div className="main-records-item-first-payamt-left">Total Int :</div>
                                    <div className="main-records-item-first-payamt-right">{i.totalInt}</div>
                                    </div>
                                </div>
                            </div>
                        }):""
                    }
                </div>
            </div>
            <div className="main-submit-buttons">
                <div className="main-submit-buttons-up">
                    <div className="main-submit-buttons-up-left">
                        <div className="main-submit-buttons-up-left-up">
                            Pay Ammount
                        </div>
                        <div className="main-submit-buttons-up-left-dw">
                            <input type="text" placeholder="Ammount paying" value={payAmmount} onChange={(e)=>{
                                setPayAmmount(e.target.value);
                            }} />
                        </div>
                    </div>

                    <div className="main-submit-buttons-up-left">
                        <div className="main-submit-buttons-up-left-up">
                            Pay Date
                        </div>
                        <div className="main-submit-buttons-up-left-dw">
                            <input type="date" placeholder="Ammount paying" value={payDate} onChange={(e)=>{
                                setPayDate(e.target.value);
                            }}/>
                        </div>
                    </div>
                </div>
                <div className="main-submit-buttons-down">
                    <button onClick={(e)=>{
                        handleCalculate(e)
                    }}>Calculate Interest </button>
                </div>
            </div>
        </div>
    );

}

export default Main;