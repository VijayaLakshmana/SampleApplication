import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField } from "../../Redux/BusDetails";
import { formatPrice } from "../../Utils/Utils";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import BusSearchService from "../../service/SearchService";
import CancelDataService from "../../service/CancelTicketServie";
export default function CancelTicket() {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const { busDetails } = useSelector((state) => state.bus);
  const cancelDataService=new CancelDataService();
  useEffect(() => {
    const busSearchService = new BusSearchService();
    const username = sessionStorage.getItem("username");
    setUserName(username);
    cancelDataService.fetchBookingDetails(setTicketDetails,toast);
    busSearchService.busData(dispatch,toast);
  }, []);
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function handleCancelBooking(bookingId, seatNumber, busId, busDate, time) {
    const departureDateTime = new Date(`${busDate} ${time}`);
    const currentTime = new Date();
    const timeDifference = departureDateTime.getTime() - currentTime.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    console.log(hoursDifference);
    if (hoursDifference > 24) {
      const confirmed = window.confirm("Are you sure to cancel the ticket?");
      if (!confirmed) {
        return;
      }
      const updatedTicketDetails = ticketDetails.map((booking) => {
        if (booking._id === bookingId) {
          const updatedSeats = booking.seats.map((seat) => {
            if (seat.seat === seatNumber) {
              return {
                ...seat,
                passenger: {
                  ...seat.passenger,
                  status: "canceled",
                },
              };
            }
            return seat;
          });
          return {
            ...booking,
            seats: updatedSeats,
            bookingStatus: updatedSeats.some(
              (seat) => seat.passenger.status !== "canceled"
            )
              ? "booked"
              : "canceled",
          };
        }
        return booking;
      });
      setTicketDetails(updatedTicketDetails);
      cancelDataService.updateTicketDetails(bookingId, updatedTicketDetails.find((booking) => booking._id === bookingId), toast);
      const updatedBusDetails = busDetails.map((prevBusDetails) => {
        if (busId === prevBusDetails._id) {
          console.log(prevBusDetails.dates);
          const updatedDates = prevBusDetails.dates.map((date) => {
            if (busDate === date.date) {
              const updatedBookedSeats = date.bookedSeats.filter(
                (seat) => seat !== seatNumber
              );
              return { ...date, bookedSeats: updatedBookedSeats };
            }
            return date;
          });
          return { ...prevBusDetails, dates: updatedDates };
        }
        return prevBusDetails;
      });
      dispatch(updateField({ field: "busDetails", value: updatedBusDetails }));
      cancelDataService.updateSeatCancelled(busId, updatedBusDetails);
    } else {
      toast.error(
        "You can only cancel the ticket up to 24 hours before boarding."
      );
    }
  }
  return (
    <div>
      <h2>Booked Tickets:</h2>
      <div className="busTicket">
        {ticketDetails
          .filter(
            (ticket) =>
              ticket.bookingStatus === "booked" && ticket.username === userName
          )
          .map((booking) => (
            <div key={booking._id} className="busBook">
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
                    {seat.passenger.status==="booked"?  (
                      <div>
                        <p>Seat:{seat.seat}</p>
                        <p>Passenger Name:{seat.passenger.name}</p>
                        <button
                          onClick={() =>
                            handleCancelBooking(
                              booking._id,
                              seat.seat,
                              booking.connection,
                              booking.date,
                              booking.fromTime
                            )
                          }
                        >
                          Cancel Ticket
                        </button>
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