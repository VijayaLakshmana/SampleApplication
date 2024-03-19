import { useEffect, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import InputField from "../HomePage/Input";
import axios from "axios";
export default function Login() {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const usenavigate = useNavigate();
  useEffect(() => {
    sessionStorage.removeItem("username");
  }, []);
  function proceedLogin(e) {
    e.preventDefault();
    if (validate()) {
      axios.get(`http://localhost:3000/user/${username}`).then((resp) => {
        if (resp.data.password === password) {
          alert("success");
          sessionStorage.setItem("username", username);
          usenavigate("/");
        } else {
          alert("Please Enter valid password");
        }
      });
    }
  }
  function validate() {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      alert("Please Enter username");
    }
    if (password === "" || password === null) {
      result = false;
      alert("Please Enter password");
    }
    return result;
  }
  return (
    <fieldset className="logindetail">
      <form onSubmit={proceedLogin}>
        <h3 className="login">
          <center>Login Form</center>
        </h3>
        <InputField
          value={username}
          onChange={(e) => usernameupdate(e.target.value)}
          className="userNameLogin"
          type="text"
          placeholder="User Name"
          name="username"
        />
        <InputField
          value={password}
          onChange={(e) => passwordupdate(e.target.value)}
          type="password"
          className="passwordLogin"
          placeholder="Password"
          name="psw"
        />
        <br />
        <button className="loginbutton" type="submit">
          Login
        </button>
        <br />
        <Link to={"/register"}>New User &nbsp;</Link>
        {/* <Link to={"/forgetpassword"}>&nbsp; Forget Password?</Link> */}
      </form>
    </fieldset>
  );
}
