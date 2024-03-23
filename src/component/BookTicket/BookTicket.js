import { useState } from "react";
import InputField from "../HomePage/Input";
import { useEffect } from "react";
import NavigationBar from "../HomePage/NavigationBar";
import React from "react";
// import axios from "axios";
// import { bookTicket } from "../../service/busService";
// import { fetchBusData } from "../../service/busService";
import Api from "../../service/busService";
import "./BookTicket.css";
import { updateField } from "../../BusDetails";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
// import {
//   setDate,
//   setBusDetails,
//   setSelectedBus,
//   setSelectedSeats,
// } from "../../BusDetails";
export default function TicketBooking() {
  const busUrl = process.env.REACT_APP_BUS_URL;
  const bookingUrl = process.env.REACT_APP_BOOKING_URL;
  const api = new Api();
  useEffect(() => {
    // async function fetchData() {
    //   try {
    //     const data = await fetchBusData();
    //     // dispatch(setBusDetails(data));
    //     dispatch(updateField({ field: "busDetails", value: data }));
    //   } catch (error) {
    //     console.error("Error fetching bus data:", error);
    //     toast.error("Failed to fetch bus data. Please try again later.");
    //   }
    // }
    // fetchData();
    api
      .get(busUrl)
      .then((response) => {
        dispatch(updateField({ field: "busDetails", value: response.data }));
      })
      .catch((error) => {
        console.error("Error fetching bus data:", error);
      });
    const storedSelectedBus = sessionStorage.getItem("selectedBus");
    if (storedSelectedBus) {
      // dispatch(setSelectedBus(JSON.parse(storedSelectedBus)));
      dispatch(
        updateField({
          field: "selectedBus",
          value: JSON.parse(storedSelectedBus),
        })
      );
    }
    const storedSeat = sessionStorage.getItem("selectedSeats");
    if (storedSeat) {
      // dispatch(setSelectedSeats(JSON.parse(storedSeat)));
      dispatch(
        updateField({ field: "selectedSeats", value: JSON.parse(storedSeat) })
      );
    }
    const date = sessionStorage.getItem("date");
    // dispatch(setDate(date));
    dispatch(updateField({ field: "date", value: date }));
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
        // if (bus.id === selectedBus.id) {
        //   axios.put(`http://localhost:3001/bus/${bus.id}`, {
        //     ...bus,
        //     dates: bus.dates.map((dateObj) => {
        //       if (dateObj.date === date) {
        //         return {
        //           ...dateObj,
        //           bookedSeats: [...dateObj.bookedSeats, ...selectedSeats[date]],
        //         };
        //       }
        //       return dateObj;
        //     }),
        //   });
        // }
        if (bus.id === selectedBus.id) {
          api
            .put(`${busUrl}/${bus.id}`, {
              ...bus,
              dates: bus.dates.map((dateObj) => {
                if (dateObj.date === date) {
                  return {
                    ...dateObj,
                    bookedSeats: [
                      ...dateObj.bookedSeats,
                      ...selectedSeats[date],
                    ],
                  };
                }
                return dateObj;
              }),
            })
            .then(() =>
              console.log(`Updated bus ${bus.id} with new booked seats`)
            )
            .catch((error) =>
              console.error(`Failed to update bus ${bus.id}:`, error)
            );
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
    // dispatch(setSelectedSeats({ ...selectedSeats, [date]: [] }));
    dispatch(
      updateField({
        field: "selectedSeats",
        value: { ...selectedSeats, [date]: [] },
      })
    );
    // axios
    //   .post("http://localhost:3003/Bookings", newBooking, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then(() => {
    //     toast.success("Ticket booked");
    //   });
    // async function handleBooking(newBooking) {
    //   try {
    //     await bookTicket(newBooking);
    //     toast.success("Ticket booked");
    //   } catch (error) {
    //     console.error("Error booking ticket:", error);
    //     toast.error("Failed to book ticket. Please try again later.");
    //   }
    // }
    // handleBooking(newBooking);
    api
      .post(bookingUrl, newBooking)
      .then(() => {
        toast.success("Ticket booked.");
      })
      .catch((err) => {
        alert("Failed: " + err.message);
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
