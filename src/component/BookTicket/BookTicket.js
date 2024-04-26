import { useState } from "react";
import InputField from "../HomePage/Input";
import { useEffect } from "react";
import NavigationBar from "../HomePage/NavigationBar";
import React from "react";
import "./BookTicket.css";
import { updateField } from "../../Redux/BusDetails";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import BookingService from "../../service/BookSeatService";
import BusSearchService from "../../service/SearchService";
export default function TicketBooking() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    const busSearchService = new BusSearchService();
    busSearchService.busData(dispatch,toast);
    const storedSelectedBus = sessionStorage.getItem("selectedBus");
    if (storedSelectedBus) {
      dispatch(
        updateField({
          field: "selectedBus",
          value: JSON.parse(storedSelectedBus),
        })
      );
    }
    const storedSeat = sessionStorage.getItem("selectedSeats");
    if (storedSeat) {
      dispatch(
        updateField({ field: "selectedSeats", value: JSON.parse(storedSeat) })
      );
    }
    const boarding = sessionStorage.getItem("BoardingPoint");
    if (boarding) {
      dispatch(updateField({ field: "showBoardingPoint", value: boarding }));
    }
    const droping = sessionStorage.getItem("DropingPoint");
    if (boarding) {
      dispatch(updateField({ field: "showDropingPoint", value: droping }));
    }
    const date = sessionStorage.getItem("date");
    dispatch(updateField({ field: "date", value: date }));
    const username = sessionStorage.getItem("username");
    setUsername(username);
  }, []);
  const dispatch = useDispatch();
  const {
    date,
    busDetails,
    selectedBus,
    selectedSeats,
    showBoardingPoint,
    showDropingPoint,
  } = useSelector((state) => state.bus);
  useEffect(() => {
    const initialpassengerDetails = {};
    selectedSeats[date]?.forEach((seatNumber) => {
      initialpassengerDetails[seatNumber] = {
        name: "",
        age: "",
        gender: "", 
        status: "booked",
      };
    });
    setPassengerDetails(initialpassengerDetails);
  }, [selectedSeats, date]);
  const usenavigate = useNavigate();
  const [username, setUsername] = useState("");
  const [passengerDetails, setPassengerDetails] = useState({});
  function handleBookTicket(e) {
    e.preventDefault();
    const bookingService = new BookingService();
    if (selectedBus && date) {
      bookingService.updateBusSeatDetails(busDetails,selectedBus,selectedSeats,date,toast,usenavigate);
    }
    const time = Date.now();
    const ticketnumber = time;
    const totalPrice = selectedBus.price * selectedSeats[date].length;
    console.log(passengerDetails);
    const newBooking = {
      _id: ticketnumber,
      username: username,
      busName: selectedBus.busname,
      date: date,
      from: selectedBus.from,
      boardingPoint: showBoardingPoint,
      fromTime: selectedBus.fromTiming,
      to: selectedBus.to,
      dropingPoint: showDropingPoint,
      toTime: selectedBus.toTiming,
      price: totalPrice,
      email:email,
      phone:phone,
      connection: selectedBus._id,
      hrs: selectedBus.hrs,
      bookingStatus: "booked",
      seats: selectedSeats[date]?.map((seatNumber) => ({
        seat: seatNumber,
        passenger: passengerDetails[seatNumber],
      })),
    };
    dispatch(
      updateField({
        field: "selectedSeats",
        value: { ...selectedSeats, [date]: [] },
      })
    );
    bookingService.bookTicket(newBooking, toast);
  }
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  console.log();
  return (
    <div className="ticketBookingDetailsPage">
      <div className="container1">
        <NavigationBar />
      </div>
      <div className="container2">
        {date ? (
          <span className="destingationFont">
            {capitalizeFirstLetter(selectedBus.from)}&#8594;
            {capitalizeFirstLetter(selectedBus.to)}
          </span>
        ) : null}
      </div>
      <div className="passengerForm">
        <form onSubmit={(e) => handleBookTicket(e)}>
          {selectedSeats[date]?.map((seatNumber) => (
            <div key={seatNumber} className="passengerDetails">
              <p>Seat Number: {seatNumber}</p>
              <label>Name:</label>
              <InputField
                type="text"
                placeholder="Name"
                value={passengerDetails[seatNumber]?.name || ""}
                onChange={(e) =>
                  setPassengerDetails({
                    ...passengerDetails,
                    [seatNumber]: {
                      ...passengerDetails[seatNumber],
                      name: e.target.value,
                    },
                  })
                }
                pattern="^[a-zA-Z]+$"
                title="Name only contains alphabets"
              />
             
              <label> Age:</label>
              <InputField
                type="number"
                placeholder="age"
                value={passengerDetails[seatNumber]?.age || ""}
                onChange={(e) =>
                  setPassengerDetails({
                    ...passengerDetails,
                    [seatNumber]: {
                      ...passengerDetails[seatNumber],
                      age: e.target.value,
                    },
                  })
                }
              />
              <label> Gender:</label>
              <input
                type="radio"
                value="Male"
                name={`gender_${seatNumber}`}
                onChange={(e) =>
                  setPassengerDetails({
                    ...passengerDetails,
                    [seatNumber]: {
                      ...passengerDetails[seatNumber],
                      gender: e.target.value,
                    },
                  })
                }
              />
              <label>Male</label>
              <input
                type="radio"
                value="Female"
                name={`gender_${seatNumber}`}
                onChange={(e) =>
                  setPassengerDetails({
                    ...passengerDetails,
                    [seatNumber]: {
                      ...passengerDetails[seatNumber],
                      gender: e.target.value,
                    },
                  })
                }
              />
              <label>Female </label>
            </div>
          ))}
          <br />
          <label>Details:</label><br/><br/>
          <label>Email </label>
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label> Phone </label>
          <InputField
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            title="phonenumber must contain 10 digit"
            pattern="[0-9]{10}"
          />
          <br />
          <br />
          <center>
            <button className="bookTicketButton">Book ticket</button>
          </center>
        </form>
      </div>
    </div>
  );
}
