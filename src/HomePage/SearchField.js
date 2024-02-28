import { useNavigate } from "react-router-dom"
export default function SearchField(props){
    const usenavigate=useNavigate()
    let link;
    function handleClick(e){
        e.preventDefault()
        if(props.from!=props.to){
            link="/search"
        }else{
            link="/"
            alert("Give proper input details..")
        
        }
        usenavigate(`${link}`)
    }
    
    return(
        <>
        <form className="searchform" onSubmit={(e)=>handleClick(e)}>
         <input type="text" value={props.from} onChange={(e)=>props.setFrom(e.target.value.toLowerCase())} className="icon1" placeholder="From" required/>
         <input type="text" value={props.to} onChange={(e)=>props.setTo(e.target.value.toLowerCase())} className="icon2" placeholder="To" required/>     
         <input type="date" value={props.date} onChange={(e)=>props.setDate(e.target.value)} className="icon3" required />
         <button className="searchButton">search</button>   
         </form>
        </>
    )
}