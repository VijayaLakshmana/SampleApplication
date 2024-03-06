import { useState } from "react";
// import InputField from "../HomePage/Input";
export default function TicketBooking(props) {
  const [showBoardingPoint, setShowBoardingPoint] = useState([]);
  const [showDropingPoint, setShowDropingPoint] = useState([]);

  // const [passengerDetails, setPassengerDetails] = useState({});
  // const initialpassengerDetails = {};
  // props.selectedSeats[props.date].forEach((seatNumber) => {
  //   initialpassengerDetails[seatNumber] = { name: "", email: "", phone: "" };
  // });
  // console.log(initialpassengerDetails);
  // setPassengerDetails(initialpassengerDetails);
  // console.log(passengerDetails);
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
    props.setSelectedSeats({ ...props.selectedSeats, [props.date]: [] });
  }

  return (
    <div>
      <h1>welcome</h1>
      <div>
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
        {/* {props.selectedSeats[props.date].map((seatNumber) => (
          <div key={seatNumber}>
            <p>seat{props.seatNumber}</p>
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
        ))} */}
      </>
      <button onClick={handleBookTicket}>button</button>
    </div>
  );
}
