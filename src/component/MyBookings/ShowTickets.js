import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import React from "react";
import { formatPrice } from "../../Utils/Utils";
import { useDispatch } from "react-redux";
import TicketService from "../../service/ShowTicketService";
export default function ShowTicket({ status, filteredData, cancelled }) {
  const dispatch = useDispatch();
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
    const ticketService = new TicketService();
    ticketService.fetchData(username, dispatch, isToday);
  }, []);
  function handleCancelTicket() {
    usenavigate("ticketcancel");
  }
  return (
    <div>
      <div className="busTicket">
        {filteredData.map((booking) => (
          <div key={booking.id} className="busBook">
            <div className="ticketId">
              Ticket No: {booking._id}
              <br></br>
              <br></br>
              <div>Date:{booking.date}</div>
            </div>
            <div className="busName">
              {booking.busName}
              <div className="acList">
                {booking.AC ? <span>Ac</span> : <span>NonAc</span>}
                {booking.isSeater ? <span>seater</span> : <span>sleeper</span>}
              </div>
            </div>
            <div className="fromTiming">
              {booking.fromTime}
              <div className="from">{capitalizeFirstLetter(booking.from)}</div>
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
                  {(
                    cancelled
                      ? booking.bookingStatus === "canceled" ||
                        (booking.bookingStatus === "booked" &&
                          seat.passenger.status === "canceled")
                      : seat.passenger.status !== "canceled"
                  ) ? (
                      <div>
                        <p>Seat:{seat.seat}</p>
                        <p>Passenger Name:{seat.passenger.name}</p>
                      </div>
                    ) : null}
                </div>
              ))}
              {status === "booked" ? (
                <div>
                  <button onClick={handleCancelTicket}>Cancel Ticket</button>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
ShowTicket.propTypes = {
  status: PropTypes.string,
  filteredData: PropTypes.array.isRequired,
  cancelled: PropTypes.bool,
};
