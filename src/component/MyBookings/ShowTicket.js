import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import React from "react";
import { formatPrice } from "../../Utils/Utils";
import Api from "../../service/busService";
export default function ShowTicket({ status }) {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [userName, setUserName] = useState("");
  const bookingUrl = process.env.REACT_APP_BOOKING_URL;
  const api = new Api();
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const usenavigate = useNavigate();
  useEffect(() => {
    const isToday = (date) => {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    };
    const username = sessionStorage.getItem("username");
    setUserName(username);
    async function fetchData() {
      try {
        const response = await api.get(bookingUrl);
        const updatedBookings = [];
        const today = new Date();
        let updated = false;
        for (const booking of response.data) {
          const ticketDate = new Date(booking.date);
          if (
            username === booking.username &&
            today > ticketDate &&
            !isToday(ticketDate) &&
            booking.bookingStatus === "booked"
          ) {
            await api.put(`${bookingUrl}/${booking.id}`, {
              ...booking,
              bookingStatus: "Completed",
            });
            updatedBookings.push({
              ...booking,
              bookingStatus: "Completed",
            });
            updated = true;
          } else {
            updatedBookings.push(booking);
          }
        }
        if (updated) {
          setTicketDetails(updatedBookings);
        } else {
          setTicketDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    }
    fetchData();
  }, []);
  function handleCancelBooking() {
    usenavigate("ticketcancel");
  }
  return (
    <div>
      <div className="busTicket">
        {ticketDetails
          .filter(
            (ticket) =>
              (ticket.bookingStatus === status && ticket.username === userName)
          )
          .map((booking) => (
            <div key={booking.id} className="busBook">
              <div className="ticketId">
                Ticket No: {booking.id}
                <br></br>
                <br></br>
                <div>Date:{booking.date}</div>
              </div>
              <div className="busName">
                {booking.busName}
                <div className="acList">
                  {booking.AC ?<span>Ac</span>:<span>NonAc</span>}
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
                    {(booking.bookingStatus==="canceled")||(seat.passenger.status !== "canceled") ? (
                      <div>
                        <p>Seat:{seat.seat}</p>
                        <p>Passenger Name:{seat.passenger.name}</p>
                      </div>
                    ) : null}
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
