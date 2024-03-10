import { useEffect, useState } from "react";
export default function CancelTicket(props) {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    setUserName(username);
    fetch("http://localhost:3003/Bookings")
      .then((res) => res.json())
      .then((res) => setTicketDetails([...res]));
    fetch("http://localhost:3001/bus")
      .then((res) => res.json())
      .then((res) => props.setBusDetails([...res]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    fetch(`http://localhost:3003/Bookings/${bookingId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(
        updatedTicketDetails.find((booking) => booking.id === bookingId)
      ),
    });

    const updatedBusDetails = props.busDetails.map((prevBusDetails) => {
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
    props.setBusDetails(updatedBusDetails);
    fetch(`http://localhost:3001/bus/${busId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...updatedBusDetails.find((booking) => booking.id === busId),
      }),
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
  console.log(props.busDetails);
  return (
    <>
      <h2>bookedTickets:</h2>
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
          ))}
      </div>
    </>
  );
}
