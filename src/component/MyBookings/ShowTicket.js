// import { fetchBookings } from "../../service/busService";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import React from "react";
import { formatPrice } from "../HomePage/Utils";
import Api from "../../service/busService";
export default function ShowTicket({ status }) {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [userName, setUserName] = useState("");
  const bookingUrl = process.env.REACT_APP_BOOKING_URL;
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const usenavigate = useNavigate();
  const ticketcancel = "ticketcancel";
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    setUserName(username);
    // async function fetchBookingData() {
    //   try {
    //     const bookings = await fetchBookings();
    //     setTicketDetails(bookings);
    //   } catch (error) {
    //     console.error("Error fetching bookings:", error);
    //   }
    // }
    // fetchBookingData();
    const api = new Api();
    api
      .get(bookingUrl)
      .then((response) => {
        setTicketDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bus data:", error);
      });
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
              ticket.bookingStatus === status && ticket.username === userName
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
              <div className="price">{formatPrice(booking.price)}</div>
              <div className="passengerDetailsList">
                {booking.seats.map((seat) => (
                  <div key={seat.seat}>
                    <p>Seat:{seat.seat}</p>
                    <p>Passenger Name:{seat.passenger.name}</p>
                  </div>
                ))}
                {status === "booked" ? (
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
  status: PropTypes.string.isRequired,
};
