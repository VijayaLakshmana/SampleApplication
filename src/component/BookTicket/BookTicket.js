import { useState } from "react";
import InputField from "../HomePage/Input";
import { useEffect } from "react";
import NavigationBar from "../HomePage/NavigationBar";
import "./BookTicket.css";
export default function TicketBooking(props) {
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    setUsername(username)
  }, []);
  const [showBoardingPoint, setShowBoardingPoint] = useState([]);
  const [showDropingPoint, setShowDropingPoint] = useState([]);
  const [username,setUsername]=useState('')
  const initialpassengerDetails = {};
  props.selectedSeats[props.date].forEach((seatNumber) => {
    initialpassengerDetails[seatNumber] = { name: "", email: "", phone: "" };
  });
  const [passengerDetails, setPassengerDetails] = useState(initialpassengerDetails);
  function handleBookTicket() {
    if (showDropingPoint.length === 0) {
      return alert("Give the Droping Point");
    } else if (showBoardingPoint.length === 0) {
      return alert("Give the Boarding Point");
    }else if (props.selectedBus && props.date) {
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
    const time=Date.now()
    const ticketnumber=time
    const newBooking={
      id:ticketnumber,
      username:username,
      date:props.date,
      from:props.selectedBus.from,
      boardingPoint:showBoardingPoint,
      fromTime:props.selectedBus.fromTiming,
      to:props.selectedBus.to,
      dropingPoint:showDropingPoint,
      toTime:props.selectedBus.toTiming,
      busName:props.selectedBus.name,
      price:props.selectedBus.price,
      booked:true,
      travelCompleted:false,
      seats:props.selectedSeats[props.date].map(seatNumber=>({
        seat:seatNumber,
        passenger:passengerDetails[seatNumber]
      }))
    }
    fetch("http://localhost:3003/Bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newBooking),
    })
      .then((res) => {
        alert("Ticket booked");
      })
      .catch((err) => {
        alert("Failed :" + err.message);
      });
    props.setSelectedSeats({ ...props.selectedSeats, [props.date]: [] });
  }

  return (
    <div className="ticketBookingDetailsPage">
      <div className="container1">
        <NavigationBar/>
      </div>
      <div className="container2">
          <h1>hello</h1>
      </div>
      <div >
        {props.busDetails.map((bus) =>
          bus.dates.map((dateObj) =>
            dateObj.date === props.date ? (
              <div key={dateObj.date}>
                {props.selectedBus.id === bus.id &&
                  props.date === dateObj.date && (
                    <div>
                      <select
                        value={showBoardingPoint}
                        onChange={(e) => setShowBoardingPoint(e.target.value)}
                      >
                        <option value="">select Boarding Point</option>
                        {bus.boardingStop.map((point, index) => (
                          <option key={index} value={point.stopingPoint}>
                            {point.stopingPoint}-{point.time}
                          </option>
                        ))}
                      </select>
                      <select
                        value={showDropingPoint}
                        onChange={(e) => setShowDropingPoint(e.target.value)}
                      >
                        <option value="">select Droping Point</option>
                        {bus.dropingStop.map((point, index) => (
                          <option key={index} value={point.stopingPoint}>
                            {point.stopingPoint}-{point.time}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
              </div>
            ) : null
          )
        )}
      </div>
      <>
        {props.selectedSeats[props.date].map((seatNumber) => (
          <div key={seatNumber}>
            <p>Seat Number: {seatNumber}</p>
            <InputField
              type="text"
              placeholder="Name"
              value={passengerDetails[seatNumber].name}
              onChange={(e) =>
                setPassengerDetails({
                  ...passengerDetails,
                  [seatNumber]: {
                    ...passengerDetails[seatNumber],
                    name: e.target.value,
                  },
                })
              }
            />
            <InputField
              type="email"
              placeholder="Email"
              value={passengerDetails[seatNumber].email}
              onChange={(e) =>
                setPassengerDetails({
                  ...passengerDetails,
                  [seatNumber]: {
                    ...passengerDetails[seatNumber],
                    email: e.target.value,
                  },
                })
              }
            />
            <InputField
              type="tel"
              placeholder="phone"
              value={passengerDetails[seatNumber].phone}
              onChange={(e) =>
                setPassengerDetails({
                  ...passengerDetails,
                  [seatNumber]: {
                    ...passengerDetails[seatNumber],
                    phone: e.target.value,
                  },
                })
              }
            />
          </div>
        ))}
      </>
      <button onClick={handleBookTicket} disabled={Object.values(passengerDetails).some(detail=>!detail.name|| !detail.email||!detail.phone)}>Confirm ticket</button>
    </div>
  );
}
