import { useState } from "react";
import React from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import InputField from "../HomePage/Input";
// import { registerUser } from "../../service/busService";
import Api from "../../service/busService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
export default function SignUp() {
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [address, addresschange] = useState("");
  const [gender, genderchange] = useState("");
  const usenavigate = useNavigate();
  const userUrl=process.env.REACT_APP_USER_URL;
  function handleSubmit(e) {
    e.preventDefault();
    let regObj = { id, name, password, email, phone, address, gender };
    // registerUser(regObj)
    //   .then(() => {
    //     toast.success("Registered successfully.");
    //     usenavigate("/login");
    //   })
    //   .catch((err) => {
    //     alert("Failed: " + err.message);
    //   });
    const api = new Api();
    api.post(userUrl, regObj)
      .then(() => {
        toast.success("Registered successfully.");
        usenavigate("/login");
      })
      .catch((err) => {
        alert("Failed: " + err.message);
      });
  }
  return (
    <div className="signUpBackground">
      <fieldset className="registrationDetail">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3>SignUp</h3>
          <table>
            <tr>
              <td>
                <label>Full Name</label>
              </td>
              <td>
                <label>Username</label>
              </td>
            </tr>
            <tr>
              <td>
                <InputField
                  value={name}
                  onChange={(e) => namechange(e.target.value)}
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  pattern="^[a-zA-Z]+$"
                  title="Name only contains alphabets"
                  name="name"
                />
              </td>
              <td>
                <InputField
                  value={id}
                  onChange={(e) => idchange(e.target.value)}
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  pattern="^[a-zA-Z]+$"
                  title="Name only contains alphabets"
                  name="username"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Email</label>
              </td>
              <td>
                <label>Phone Number</label>
              </td>
            </tr>
            <tr>
              <td>
                <InputField
                  value={email}
                  onChange={(e) => emailchange(e.target.value)}
                  type="email"
                  id="email"
                  placeholder="Enter your Email"
                  name="email"
                />
              </td>
              <td>
                <InputField
                  value={phone}
                  onChange={(e) => phonechange(e.target.value)}
                  type="tel"
                  id="phonenumber"
                  placeholder="Enter your phone number"
                  name="phonenumber"
                  title="phonenumber must contain 10 digit"
                  pattern="[0-9]{10}"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Password</label>
              </td>
            </tr>
            <tr>
              <td>
                <InputField
                  value={password}
                  onChange={(e) => passwordchange(e.target.value)}
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  pattern="(?=.*[A-Z])(?=.*\d).{8,}"
                  title="Password must contain at least one capital letter, one number, and be at least 8 characters long"
                />
              </td>
            </tr>
          </table>
          <label>Address</label>
          <br></br>
          <textarea
            value={address}
            onChange={(e) => addresschange(e.target.value)}
            className="addressArea"
          />
          <br></br>
          <label>Gender</label>
          <br></br>
          <input
            type="radio"
            checked={gender === "Male"}
            onChange={(e) => genderchange(e.target.value)}
            id="male"
            name="gender"
            value="Male"
          />
          <label>Male</label>
          <input
            type="radio"
            checked={gender === "Female"}
            onChange={(e) => genderchange(e.target.value)}
            id="female"
            name="gender"
            value="Female"
          />
          <label>Female</label>
          <br></br>
          <button className="registrationbutton">submit</button>
        </form>
      </fieldset>
    </div>
  );
}
