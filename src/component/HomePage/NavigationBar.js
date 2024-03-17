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
  function handleBookingClick(e, name) {
    if (loginName === "Login") {
      e.preventDefault();
      alert(`Please login to  ${name}`);
    }
  }
  return (
    <>
      <div className="content1">
        <span className="appLogo">Bus Ticket Booking</span>
        <div className="navigationbar-right">
          <Link to={"/login"} id="login">
            {loginName}
          </Link>
          <Link
            to={"/mybookings/ticketcancel"}
            id="ticketCancel"
            onClick={(e) => handleBookingClick(e, "Cancel Ticket")}
          >
            Cancel ticket
          </Link>
          <Link
            to={"/mybookings"}
            id="ticket"
            onClick={(e) => handleBookingClick(e, "view My Bookings")}
          >
            My Bookings
          </Link>
        </div>
      </div>
    </>
  );
}
