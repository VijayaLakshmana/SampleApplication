import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function MyBookings() {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [userName, setUserName] = useState("");
  const usenavigate = useNavigate();
  const ticketcancel = "ticketcancel";
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    setUserName(username);
    fetch("http://localhost:3003/Bookings")
      .then((res) => res.json())
      .then((res) => setTicketDetails([...res]));
  }, []);
  function handleCancelBooking() {
    usenavigate(ticketcancel);
  }
  return (
    <>
      <h2>Booked Tickets:</h2>
      <div>
        {ticketDetails
          .filter(
            (ticket) =>
              ticket.bookingStatus === "booked" && ticket.username === userName
          )
          .map((booking) => (
            <div key={booking.id}>
              <p>bus:{booking.busName}</p>
              <p>Travel Date:{booking.date}</p>
              {booking.seats.map((seat) => (
                <div key={seat.seat}>
                  <p>Seat:{seat.seat}</p>
                  <p>Passenger Name:{seat.passenger.name}</p>
                </div>
              ))}
              <button onClick={handleCancelBooking}>Cancel Ticket</button>
            </div>
          ))}
      </div>
      <h2>Completed Tickets:</h2>
      <div>
        {ticketDetails
          .filter(
            (ticket) =>
              ticket.bookingStatus === "Completed" &&
              ticket.username === userName
          )
          .map((booking) => (
            <div key={booking.id}>
              <p>Bus:{booking.busName}</p>
              <p>Travel Date:{booking.date}</p>
              {booking.seats.map((seat) => (
                <div key={seat.seat}>
                  <p>Seat:{seat.seat}</p>
                  <p>Passenger Name:{seat.passenger.name}</p>
                </div>
              ))}
            </div>
          ))}
      </div>
      <h2>cancelled Tickets:</h2>
      <div>
        {ticketDetails
          .filter(
            (ticket) =>
              ticket.bookingStatus === "cancelled" &&
              ticket.username === userName
          )
          .map((booking) => (
            <div key={booking.id}>
              <p>Bus:{booking.busName}</p>
              <p>Travel Date:{booking.date}</p>
              {booking.seats.map((seat) => (
                <div key={seat.seat}>
                  <p>Seat:{seat.seat}</p>
                  <p>Passenger Name:{seat.passenger.name}</p>
                </div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
}
