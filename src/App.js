import SignUp from "./SignUp/SignUp";
import HomePage from "./HomePage/HomePage";
import Login from "./LoginPage/Login";
import Search from "./Search.js/Search";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  const[from,setFrom]=useState('')
  const[to,setTo]=useState('')
  const[date,setDate]=useState('')

  return (
    <div className="App">
    <BrowserRouter>   
    <Routes>
      <Route path='/' element={<HomePage from={from} setFrom={setFrom} to={to} setTo={setTo} date={date} setDate={setDate} />}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<SignUp/>}></Route>
      <Route path='/search' element={<Search from={from} setFrom={setFrom} to={to} setTo={setTo} date={date} setDate={setDate} />}></Route>
    </Routes>
    </BrowserRouter>  
    </div>
  );
}

export default App;
