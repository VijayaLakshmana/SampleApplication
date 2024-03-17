import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import {  setBusDetails } from "../../BusDetails";
export default function CancelTicket(props) {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    setUserName(username);
    axios.get("http://localhost:3003/Bookings")
      .then((res) => setTicketDetails([...res.data]));
    axios.get("http://localhost:3001/bus")
      .then((res) => dispatch(setBusDetails([...res.data])));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useDispatch();
  const {
    busDetails,
  }= useSelector(state => state.bus);
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function handleCancelBooking(bookingId, seatNumber, busId, busDate) {
    const updatedTicketDetails = ticketDetails.map((booking) => {
      if (booking.id === bookingId) {
        const updatedSeats = booking.seats.filter(
          (seat) => seat.seat !== seatNumber
        );
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
        ...updatedTicketDetails.find((booking) => booking.id === bookingId)
      
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
    axios.put(`http://localhost:3001/bus/${busId}`, {
        ...updatedBusDetails.find((booking) => booking.id === busId),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed");
        }
        console.log("bus details updated successfully");
      })
      .catch((error) => {
        console.error("error", error);
      });
  }
  console.log(busDetails);
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
                  <button
                    onClick={() =>
                      handleCancelBooking(
                        booking.id,
                        seat.seat,
                        booking.connection,
                        booking.date
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
