import NavigationBar from "../HomePage/NavigationBar";
import React from "react";
import "./MyBooking.css";
import ShowTicket from "./ShowTicket";

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
        <ShowTicket name={"booked"} />
      </>
      <h2>Travelled Tickets:</h2>
      <>
        <ShowTicket name={"Completed"} />
      </>
      <h2>Cancelled Tickets:</h2>
      <>
        <ShowTicket name={"cancelled"} />
      </>
    </div>
  );
}
