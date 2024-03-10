import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavigationBar() {
  let [loginName, setloginName] = useState("");
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      setloginName("Login");
    } else {
      setloginName(`${username}`);
    }
  }, []);
  return (
    <>
      <div className="content1">
        <span className="appLogo">Bus Ticket Booking</span>
        <div className="navigationbar-right">
          <Link to={"/login"} id="login">
            {loginName}
          </Link>
          <Link to={"/mybookings/ticketcancel"} id="ticketCancel">
            Cancel ticket
          </Link>
          <Link to={"/mybookings"} id="ticket">
            My Bookings
          </Link>
        </div>
      </div>
    </>
  );
}
