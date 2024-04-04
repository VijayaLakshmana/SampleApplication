import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import React from "react";
import { formatPrice } from "../../Utils/Utils";
import { useDispatch,useSelector } from "react-redux";
import TicketService from "../../service/ShowTicketService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
export default function ShowCancelledTicket({ status }) {
  const {
    ticketDetails
  } = useSelector((state) => state.bus);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
 
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } 
  useEffect(()=>{
    const ticketService=new TicketService();
    const username = sessionStorage.getItem("username");
    setUserName(username);
    ticketService.showBooking(dispatch,toast);
  },[]);
  return (
    <div>
      <div className="busTicket">
        {ticketDetails
          .filter(
            (ticket) =>
              (ticket.bookingStatus === status &&
                ticket.username === userName) ||
              (ticket.username === userName &&
                ticket.bookingStatus === "booked" &&
                ticket.seats.some(
                  (seat) => seat.passenger.status === "canceled"
                ))
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
                    {(booking.bookingStatus === "canceled") ||
                    (booking.bookingStatus === "booked" && seat.passenger.status === "canceled") ? (
                        <div>
                          <p>Seat:{seat.seat}</p>
                          <p>Passenger Name:{seat.passenger.name}</p>
                        </div>
                      ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
ShowCancelledTicket.propTypes = {
  status: PropTypes.string.isRequired,
};
