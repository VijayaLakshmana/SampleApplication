import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../HomePage/NavigationBar";
import  "./MyBooking.css"
export default function MyBookings() {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [userName, setUserName] = useState("");
  const usenavigate = useNavigate();
  const ticketcancel = "ticketcancel";
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
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
    <div>
    <div>
     <NavigationBar/><br/><br/>
    </div>
      <h2>Booked Tickets:</h2>
      <div className="busTicket">
        {ticketDetails
          .filter(
            (ticket) =>
              ticket.bookingStatus === "booked" && ticket.username === userName
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
              <button onClick={handleCancelBooking}>Cancel Ticket</button>
              </div>
            </div>
          ))}
      </div>
      <h2>Travelled Tickets:</h2>
      <div className="busTicket">
        {ticketDetails
          .filter(
            (ticket) =>
              ticket.bookingStatus === "Completed" &&
              ticket.username === userName
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
            </div>
          </div>
          ))}
      </div>
      <h2>Cancelled Tickets:</h2>
      <div className="busTicket">
        {ticketDetails
          .filter(
            (ticket) =>
              ticket.bookingStatus === "cancelled" &&
              ticket.username === userName
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
            </div>
          </div>
          ))}
      </div>
    </div>
  );
}
