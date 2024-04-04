import NavigationBar from "../HomePage/NavigationBar";
import React from "react";
import "./MyBooking.css";
import ShowTicket from "./ShowTickets";
import ShowCancelledTicket from "./ShowCancelledTickets";
export default function MyBookings() {
  return (
    <div>
      <div>
        <NavigationBar />
        <br />
        <br />
      </div>
      <h2>Booked Tickets:</h2>
      <>
        <ShowTicket status={"booked"}/>
      </>
      <h2>Travelled Tickets:</h2>
      <>
        <ShowTicket status={"Completed"}  />
      </>
      <h2>Cancelled Tickets:</h2>
      <>
        <ShowCancelledTicket status={"canceled"}  />
      </>
    </div>
  );
}



