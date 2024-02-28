import { useState } from "react";
import "./SignUp.css"
import { useNavigate } from "react-router-dom";
export default function SignUp(){
    const[id,idchange]=useState('');
    const[name,namechange]=useState('');
    const[password,passwordchange]=useState('');
    const[email,emailchange]=useState('');
    const[phone,phonechange]=useState('');
    const[address,addresschange]=useState('');
    const[gender,genderchange]=useState('');
    const usenavigate=useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        let regObj={id,name,password,email,phone,address,gender};
        fetch("http://localhost:3000/user",{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(regObj)
        }).then((res)=>{
            alert('Registered successfully.')
            usenavigate('/login')
        }).catch((err)=>{
            alert('Failed :'+err.message);
        })
    }
    return(
        <div className="signUpBackground">   
        <fieldset className="registrationDetail">
        <form onSubmit={(e)=>handleSubmit(e)}>
        <h3>SignUp</h3>
        <table>
        <tr>
        <td><label for="name">Full Name</label></td>
        <td><label for="username">Username</label></td>
        </tr>
        <tr>
        <td><input value={name} onChange={e=>namechange(e.target.value)} type="text" id="name" placeholder="Enter your name" name="name" required/></td>
        <td><input value={id} onChange={e=>idchange(e.target.value)} type="text" id="username" placeholder="Enter your username" name="username" required/></td></tr>
        <tr>
        <td><label for="email">Email</label></td>
        <td><label for="phonenumber">Phone Number</label></td>
        </tr>
        <tr>
        <td><input value={email} onChange={e=>emailchange(e.target.value)} type="text" id="email" placeholder="Enter your Email" name="email" required/></td>
        <td><input value={phone} onChange={e=>phonechange(e.target.value)} type="tell" id="phonenumber" placeholder="Enter your phone number" name="phonenumber" required/></td></tr>
        <tr>
        <td><label for="password">Password</label></td>
        </tr><tr>
        <td><input value={password} onChange={e=>passwordchange(e.target.value)} type="password" id="password" placeholder="Enter your password" name="password" required/></td></tr>
        </table>
        <label>Address</label>
        <td><textarea value={address} onChange={e=>addresschange(e.target.value)} className="addressArea"/></td>
        <label>Gender</label><br></br>
        <input type="radio" checked={gender==='Male'} onChange={e=>genderchange(e.target.value)} id="male" name="gender" value="Male"/>
        <label for="male">Male</label>
        <input type="radio"  checked={gender==='Female'} onChange={e=>genderchange(e.target.value)}id="female" name="gender" value="Female"/>
        <label for="female">Female</label><br></br>
        <button className="registrationbutton">submit</button>
        </form>
        </fieldset>
        </div>
    )

}