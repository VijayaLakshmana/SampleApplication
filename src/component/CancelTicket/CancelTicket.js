import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setBusDetails } from "../../BusDetails";
import { formatPrice } from "../HomePage/Utils";
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";
export default function CancelTicket() {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const { busDetails } = useSelector((state) => state.bus);
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    setUserName(username);
    axios
      .get("http://localhost:3003/Bookings")
      .then((res) => setTicketDetails([...res.data]));
    axios
      .get("http://localhost:3001/bus")
      .then((res) => dispatch(setBusDetails([...res.data])));
  }, []);
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function handleCancelBooking(bookingId, seatNumber, busId, busDate, time) {
    const departureDateTime = new Date(`${busDate} ${time}`);
    const currentTime = new Date();
    const timeDifference = departureDateTime.getTime() - currentTime.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    if (hoursDifference > 24) {
      const updatedTicketDetails = ticketDetails.map((booking) => {
        if (booking.id === bookingId) {
          const updatedSeats = booking.seats.filter(
            (seat) => seat.seat !== seatNumber
          );
          console.log(updatedSeats, "hello");
          return {
            ...booking,
            seats: updatedSeats,
            bookingStatus:
              updatedSeats.length === 0 ? "cancelled" : booking.bookingStatus,
          };
        }
        return booking;
      });
      setTicketDetails(updatedTicketDetails);
      axios.put(`http://localhost:3003/Bookings/${bookingId}`, {
        ...updatedTicketDetails.find((booking) => booking.id === bookingId),
      });

      const updatedBusDetails = busDetails.map((prevBusDetails) => {
        if (busId === prevBusDetails.id) {
          const updatedDates = prevBusDetails.dates.map((date) => {
            if (busDate === date.date) {
              const updatedBookedSeats = date.bookedSeats.filter(
                (seat) => seat !== seatNumber
              );
              return { ...date, bookedSeats: updatedBookedSeats };
            }
            return date;
          });
          return {
            ...prevBusDetails,
            dates: updatedDates,
          };
        }
        return prevBusDetails;
      });
      dispatch(setBusDetails(updatedBusDetails));
      axios
        .put(`http://localhost:3001/bus/${busId}`, {
          ...updatedBusDetails.find((booking) => booking.id === busId),
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Bus details updated successfully");
          } else {
            throw new Error("Failed to update bus details");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      toast.error("You can't cancel ticket Befor 24hrs for Boarding");
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
            <div key={booking.id} className="busBook">
              <div className="ticketId">Ticket No: {booking.id}<br></br><br></br>
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
                    <p>Seat:{seat.seat}</p>
                    <p>Passenger Name:{seat.passenger.name}</p>
                    <button
                      onClick={() =>
                        handleCancelBooking(
                          booking.id,
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
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
