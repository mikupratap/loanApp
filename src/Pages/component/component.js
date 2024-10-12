import React, { useEffect } from "react";
import { useState } from "react";
import './component.css';
import { useNavigate } from "react-router-dom";
function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY))+1;
  }
const ForcePay=()=>{
  const navigate=useNavigate();
  const [obj,setObj]=useState({});
  useEffect(()=>{
      let str=localStorage.getItem("myappobj");
      if(!str){
         window.alert("Enter Loan Details first")
         navigate("/");
         return ;
      }
      else{
        setObj(JSON.parse(str));
        if(obj.totalamt==0){
            window.alert("Congragulations , you don't have any debt");
            navigate("/");
            return ;
        }
      }
  },[]);
  return(
  <div className="force-close-cont">
      <div className="force-close-main">
            <div className="force-close-main-heading">
                Total You have to pay
            </div>
            <div className="force-close-main-body">
                <div className="force-close-main-body-item">
                    <div className="force-close-main-body-item-left">Rem. Principle</div>
                    <div className="force-close-main-body-item-right">{obj?.totalamt}</div>
                </div>
                <div className="force-close-main-body-item">
                    <div className="force-close-main-body-item-left">Rem. Interest</div>
                    <div className="force-close-main-body-item-right">{obj?.interest}</div>
                </div>
                <div className="force-close-main-body-item">
                    <div className="force-close-main-body-item-left">Last Date</div>
                    <div className="force-close-main-body-item-right">{obj?.lastDate}</div>
                </div>
                <div className="force-close-main-body-item">
                    <div className="force-close-main-body-item-left">Days</div>
                    <div className="force-close-main-body-item-right">{dateDiffInDays(new Date(),new Date(obj?.lastDate))}</div>
                </div>
                <div className="force-close-main-body-item">
                    <div className="force-close-main-body-item-left">Curr. Interest</div>
                    <div className="force-close-main-body-item-right">{Math.round((obj.totalamt*dateDiffInDays(new Date(),new Date(obj?.lastDate))*obj.rate)/100)}</div>
                </div>
                <div className="force-close-main-body-item">
                    <div className="force-close-main-body-item-left">Total payble</div>
                    <div className="force-close-main-body-item-right">{obj.totalamt+obj.interest+Math.round((obj.totalamt*dateDiffInDays(new Date(),new Date(obj?.lastDate))*obj.rate)/1000)}</div>
                </div>
            </div>
            <div className="force-close-main-foot">
              <button onClick={()=>{
                navigate('/')
              }}>Done</button>
            </div>
      </div>
  </div>
  );

}
export default ForcePay;