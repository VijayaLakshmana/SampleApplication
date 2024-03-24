import { useEffect, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../service/busService";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
export default function Login() {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const usenavigate = useNavigate();
  const userUrl = process.env.REACT_APP_USER_URL;
  useEffect(() => {
    sessionStorage.removeItem("username");
  }, []);
  function proceedLogin(e) {
    e.preventDefault();
    if (validate()) {
      const api = new Api();
      api
        .get(`${userUrl}/${username}`)
        .then((resp) => {
          const hashedPasswordFromServer = resp.data.password;
          bcrypt.compare(password, hashedPasswordFromServer, (err, result) => {
            if (result) {
              toast.success("Logged in successfully");
              sessionStorage.setItem("username", username);
              usenavigate("/");
            } else {
              toast.error("Please Enter valid password");
            }
          });
        })
        .catch(() => toast.error("Please Enter valid username"));
    }
  }
  function validate() {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.error("Please Enter username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.error("Please Enter password");
    }
    return result;
  }
  return (
    <fieldset className="logindetail">
      <form onSubmit={proceedLogin}>
        <h3 className="login">
          <center>Login Form</center>
        </h3>
        <input
          value={username}
          onChange={(e) => usernameupdate(e.target.value)}
          className="userNameLogin"
          type="text"
          placeholder="User Name"
          name="username"
        />
        <input
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
      </form>
    </fieldset>
  );
}
