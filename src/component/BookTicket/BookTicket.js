export default function TicketBooking(props) {
  function handleBookTicket() {
    if (props.selectedBus && props.date) {
      props.busDetails.map((bus) => {
        if (bus.id === props.selectedBus.id) {
          fetch(`http://localhost:3001/bus/${bus.id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              ...bus,
              dates: bus.dates.map((dateObj) => {
                if (dateObj.date === props.date) {
                  return {
                    ...dateObj,
                    bookedSeats: [
                      ...dateObj.bookedSeats,
                      ...props.selectedSeats[props.date],
                    ],
                  };
                }
                return dateObj;
              }),
            }),
          });
        }
        return bus;
      });
      alert(`slected seats:${props.selectedSeats[props.date]}`);
    }
    props.setSelectedSeats({ ...props.selectedSeats, [props.date]: [] });
  }
  console.log(props.busDetails);

  return (
    <div>
      <button onClick={handleBookTicket}>button</button>
    </div>
  );
}
