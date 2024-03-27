import React from "react";
import { useEffect, useState } from "react";
import Api from "../../service/busService";
import { useSelector, useDispatch } from "react-redux";
import { updateField } from "../../Redux/BusDetails";
import { formatPrice } from "../../Utils/Utils";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
export default function CancelTicket() {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const { busDetails } = useSelector((state) => state.bus);
  const busUrl = process.env.REACT_APP_BUS_URL;
  const bookingUrl = process.env.REACT_APP_BOOKING_URL;
  const api = new Api();
  useEffect(() => {
    const username = sessionStorage.getItem("username");
    setUserName(username);
    api.get(bookingUrl).then((response) => {
      setTicketDetails(response.data);
    });
    api.get(busUrl).then((response) => {
      dispatch(updateField({ field: "busDetails", value: response.data }));
    });
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
      api
        .put(
          `${bookingUrl}/${bookingId}`,
          updatedTicketDetails.find((booking) => booking.id === bookingId)
        )
        .catch((error) => {
          console.error("Error updating ticket details:", error);
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
          return { ...prevBusDetails, dates: updatedDates };
        }
        return prevBusDetails;
      });
      dispatch(updateField({ field: "busDetails", value: updatedBusDetails }));
      api.put(`${busUrl}/${busId}`, {
        ...updatedBusDetails.find((bus) => bus.id === busId),
      });
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
                    {seat.passenger.status==="booked"?  (
                      <div>
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
