
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
    }else if (props.showDropingPoint.length === 0) {
      return alert("Give the Droping Point");
    } else if (props.showBoardingPoint.length === 0) {
      return alert("Give the Boarding Point");
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
                    <select
                        value={props.showBoardingPoint}
                        onChange={(e) =>props.setShowBoardingPoint(e.target.value)}
                      >
                        <option value="">select Boarding Point</option>
                        {bus.boardingStop.map((point, index) => (
                          <option key={index} value={point.stopingPoint}>
                            {point.stopingPoint}-{point.time}
                          </option>
                        ))}
                      </select>
                      <select
                        value={props.showDropingPoint}
                        onChange={(e) => props.setShowDropingPoint(e.target.value)}
                      >
                        <option value="">select Droping Point</option>
                        {bus.dropingStop.map((point, index) => (
                          <option key={index} value={point.stopingPoint}>
                            {point.stopingPoint}-{point.time}
                          </option>
                        ))}
                      </select>
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
                          className={`${bus.isSeater?'seatButton':'seatRectangleButton'} ${isSeatBooked(bus,props.date,seatNumber)?'disabled':''} ${isSeatSelected(seatNumber)?'selected':''}${seatIndex%2===1?'withGap':''}`}
                        >
                          {seatNumber}
                        </button>
                            )
                          })}
                          </div>
                      ))}
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
