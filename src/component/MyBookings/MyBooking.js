import NavigationBar from "../HomePage/NavigationBar";
import React, { useEffect } from "react";
import "./MyBooking.css";
import ShowTicket from "./ShowTickets";
import { useSelector } from "react-redux";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
export default function MyBookings() {
  const { ticketDetails } = useSelector((state) => state.bus);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const username = sessionStorage.getItem("username");
    setUserName(username);
  }, []);
  const booked=ticketDetails.filter(
    (ticket) =>
      ticket.bookingStatus === "booked" &&
      ticket.username === userName
  );
  const completed=ticketDetails.filter(
    (ticket) =>
      ticket.bookingStatus === "Completed" &&
      ticket.username === userName
  );
  const canceled=ticketDetails.filter(
    (ticket) =>
      (ticket.bookingStatus === "canceled" &&
      ticket.username === userName) ||
      (ticket.username === userName &&
      ticket.bookingStatus === "booked" &&
      ticket.seats.some((seat) => seat.passenger.status === "canceled"))
  );
  return (
    <div>
      <div>
        <NavigationBar />
        <br />
        <br />
      </div>
      <h2>Booked Tickets:</h2>
      <>
        <ShowTicket
          status={"booked"}
          filteredData={booked}
        />
      </>
      <h2>Travelled Tickets:</h2>
      <>
        <ShowTicket
          filteredData={completed}
        />
      </>
      <h2>Cancelled Tickets:</h2>
      <>
        <ShowTicket
          filteredData={canceled}
          cancelled={true}
        />
      </>
    </div>
  );
}
