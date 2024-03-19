import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import React from "react";
export default function ShowTicket({name}) {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [userName, setUserName] = useState("");
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const usenavigate = useNavigate();
  const ticketcancel = "ticketcancel";
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    setUserName(username);
    axios
      .get("http://localhost:3003/Bookings")
      .then((res) => setTicketDetails([...res.data]));
  }, []);
  function handleCancelBooking() {
    usenavigate(ticketcancel);
  }
  return (
    <div>
      <div className="busTicket">
        {ticketDetails
          .filter(
            (ticket) =>
              ticket.bookingStatus === name && ticket.username === userName
          )
          .map((booking) => (
            <div key={booking.id} className="busBook">
              <div className="ticketId">Ticket No: {booking.id}</div>
              <div className="busName">
                {booking.busName}
                <div className="acList">
                  {booking.AC ? <span>Ac</span> : <span>NonAc</span>}
                  {booking.isSeater ? (
                    <span>seater</span>
                  ) : (
                    <span>sleeper</span>
                  )}
                </div>
              </div>
              <div className="fromTiming">
                {booking.fromTime}
                <div className="from">
                  {capitalizeFirstLetter(booking.from)}
                </div>
              </div>
              <div className="busHours">{booking.hrs}</div>
              <div className="toTiming">
                {booking.toTime}
                <div className="to">{capitalizeFirstLetter(booking.to)}</div>
              </div>
              <div className="price">Inr: {booking.price}</div>
              <div className="passengerDetailsList">
                {booking.seats.map((seat) => (
                  <div key={seat.seat}>
                    <p>Seat:{seat.seat}</p>
                    <p>Passenger Name:{seat.passenger.name}</p>
                  </div>
                ))}
                {name === "booked" ? (
                  <button onClick={handleCancelBooking}>Cancel Ticket</button>
                ) : null}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
ShowTicket.propTypes = {
  name: PropTypes.string.isRequired,
};
