import {useDispatch, useSelector } from "react-redux";
import React from "react";
import { add } from "./Add";
const Addition=()=>{
const value=useSelector((state)=>state.ad.value)
const dispatch=useDispatch()
const arr=[{id:1,tittle:"welcome",val:22},{id:2,tittle:"everyone",val:24}]

return(
    <div>
        <p>value:{value}</p>
       {arr.forEach((v)=>{
        dispatch(add(v.val))
       })}
    </div>
)
}
export default Addition
