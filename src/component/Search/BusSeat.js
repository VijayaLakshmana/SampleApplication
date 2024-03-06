
import { useNavigate } from "react-router-dom";
export default function BusSeat(props) {
 
  const usenavigate = useNavigate();
  const bookticket = "bookticket";
  function isSeatSelected(seatNumber) {
    return props.selectedSeats[props.date]?.includes(seatNumber);
  }
  function isSeatBooked(bus, date, seatNumber) {
    const selectedBusData = props.busDetails.find((b) => b.id === bus.id);
    const selectedDateData = selectedBusData.dates.find((d) => d.date === date);
    return (
      selectedDateData && selectedDateData.bookedSeats.includes(seatNumber)
    );
  }
  function handleSeatClick(seatNumber) {
    const currentSelectedSeats = props.selectedSeats[props.date] || [];
    if (currentSelectedSeats.includes(seatNumber)) {
      const updatedSeats = currentSelectedSeats.filter(
        (seat) => seat !== seatNumber
      );
      props.setSelectedSeats({
        ...props.selectedSeats,
        [props.date]: updatedSeats,
      });
    } else {
      const updatedSeats = [...currentSelectedSeats, seatNumber];
      props.setSelectedSeats({
        ...props.selectedSeats,
        [props.date]: updatedSeats,
      });
    }
  }
  function handleBookTickets() {
    if (!props.selectedSeats[props.date]?.length) {
      return alert("Select at least one seat to proceed");
    }
    usenavigate(`${bookticket}`);
  }
  return (

        <div className="seatContainer"> 
      {props.busDetails.map((bus) =>
        bus.dates.map((dateObj) =>
          dateObj.date === props.date ? (
            <div key={dateObj.date}>
              {props.selectedBus.id === bus.id &&
                props.date === dateObj.date && (
                  <div>
                    <p>
                      Total Available Seats:
                      {bus.seat - dateObj.bookedSeats.length}
                    </p>
                    <div className="outerDiv">
                    <div className="seatContainer">
                      {Array.from({length:Math.ceil(bus.seat/4)},(_,rowIndex)=>(
                        <div key={rowIndex} className="seatRow" >
                          {Array.from({length:4},(_,seatIndex)=>{
                            const seatNumber=rowIndex*4+seatIndex+1
                            return(
                              <button
                          key={seatNumber}
                          disabled={isSeatBooked(bus, props.date, seatNumber)}
                          onClick={() => handleSeatClick(seatNumber)}
                          className={`seatButton ${isSeatBooked(bus,props.date,seatNumber)?'disabled':''} ${isSeatSelected(seatNumber)?'selected':''}${seatIndex%2===1?'withGap':''}`}
                        >
                          {seatNumber}
                        </button>
                            )
                          })}
                          </div>
                      ))}
                    </div>
                    </div>
                    <button
                        onClick={handleBookTickets}
                        disabled={!props.selectedSeats[props.date]?.length}
                      >
                        Book Tickets
                      </button>
                  </div>
                )}
            </div>
          ) : null
        )
      )}
    </div>
  );
}
