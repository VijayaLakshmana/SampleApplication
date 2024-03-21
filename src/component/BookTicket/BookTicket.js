import { useState } from "react";
import InputField from "../HomePage/Input";
import { useEffect } from "react";
import NavigationBar from "../HomePage/NavigationBar";
import React from "react";
import "./BookTicket.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setDate,
  setBusDetails,
  setSelectedBus,
  setSelectedSeats,
} from "../../BusDetails";
export default function TicketBooking() {
  useEffect(() => {
    axios
      .get("http://localhost:3001/bus")
      .then((res) => dispatch(setBusDetails([...res.data])));
    const storedSelectedBus = sessionStorage.getItem("selectedBus");
    if (storedSelectedBus) {
      dispatch(setSelectedBus(JSON.parse(storedSelectedBus)));
    }
    const storedSeat = sessionStorage.getItem("selectedSeats");
    if (storedSeat) {
      dispatch(setSelectedSeats(JSON.parse(storedSeat)));
    }
    const date = sessionStorage.getItem("date");
    dispatch(setDate(date));
    let username = sessionStorage.getItem("username");
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
      initialpassengerDetails[seatNumber] = { name: "", email: "", phone: "" };
    });
    setPassengerDetails(initialpassengerDetails);
  }, [selectedSeats, date]);
  const usenavigate = useNavigate();
  const home = "/";
  const [username, setUsername] = useState("");
  const [passengerDetails, setPassengerDetails] = useState({});
  function handleBookTicket() {
    if (selectedBus && date) {
      busDetails.map((bus) => {
        if (bus.id === selectedBus.id) {
          axios.put(`http://localhost:3001/bus/${bus.id}`, {
            ...bus,
            dates: bus.dates.map((dateObj) => {
              if (dateObj.date === date) {
                return {
                  ...dateObj,
                  bookedSeats: [...dateObj.bookedSeats, ...selectedSeats[date]],
                };
              }
              return dateObj;
            }),
          });
        }
        return bus;
      });
      toast.success(`slected seats:${selectedSeats[date]}`);
      usenavigate(home);
    }
    const time = Date.now();
    const ticketnumber = time;
    const totalPrice = selectedBus.price * selectedSeats[date].length;
    console.log(totalPrice);
    const newBooking = {
      id: ticketnumber,
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
      connection: selectedBus.id,
      hrs: selectedBus.hrs,
      bookingStatus: "booked",
      seats: selectedSeats[date]?.map((seatNumber) => ({
        seat: seatNumber,
        passenger: passengerDetails[seatNumber],
      })),
    };
    dispatch(setSelectedSeats({ ...selectedSeats, [date]: [] }));
    axios
      .post("http://localhost:3003/Bookings", newBooking, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        toast.success("Ticket booked");
      });
  }
  return (
    <div className="ticketBookingDetailsPage">
      <div className="container1">
        <NavigationBar />
      </div>
      <div className="container2"></div>
      <>
        {selectedSeats[date]?.map((seatNumber) => (
          <div key={seatNumber}>
            <p>Seat Number: {seatNumber}</p>
            <InputField
              type="text"
              placeholder="Name"
              pattern="^[a-zA-Z]+$"
              title="Name only contains alphabets"
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
            />
            <InputField
              type="email"
              placeholder="Email"
              value={passengerDetails[seatNumber]?.email || ""}
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
              title="phonenumber must contain 10 digit"
              pattern="[0-9]{10}"
              value={passengerDetails[seatNumber]?.phone || ""}
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
      <button
        className="bookTicketButton"
        onClick={handleBookTicket}
        disabled={Object.values(passengerDetails).some(
          (detail) => !detail.name || !detail.email || !detail.phone
        )}
      >
        Book ticket
      </button>
    </div>
  );
}
