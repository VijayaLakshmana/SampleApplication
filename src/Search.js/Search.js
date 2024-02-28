import { useState } from "react";
import NavigationBar from "../HomePage/NavigationBar";
import SearchField from "../HomePage/SearchField";
import "./search.css"

export default function Search(props){
    const[busDetails,setBusDetails]=useState([])
    fetch("http://localhost:3000/bus").then((res)=>res.json()).then((resp)=>setBusDetails(...resp))
    return(
        <div className="searchLayout">
       <div className="component1">
        <NavigationBar/>
        </div>
        <div className="component2">
        <SearchField from={props.from} setFrom={props.setFrom} to={props.to} setTo={props.setTo} date={props.date} setDate={props.setDate}/>
        </div>
        <div className="component3">
         </div>
        <div className="component4">
        <div className="busContent">
            
            <h1>{busDetails.from}</h1>

            
        </div>
        </div>
        </div>
       
    )
}