import { useState } from "react";
import InputField from "../HomePage/Input";
import { useEffect } from "react";
import NavigationBar from "../HomePage/NavigationBar";
import React from "react";
import Api from "../../service/busService";
import "./BookTicket.css";
import { updateField } from "../../Redux/BusDetails";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
export default function TicketBooking() {
  const busUrl = process.env.REACT_APP_BUS_URL;
  const bookingUrl = process.env.REACT_APP_BOOKING_URL;
  const api = new Api();
  useEffect(() => {
    api.get(busUrl).then((response) => {
      dispatch(updateField({ field: "busDetails", value: response.data }));
    });
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
      dispatch(
        updateField({ field: "showBoardingPoint", value: boarding })
      );
    }
    const droping = sessionStorage.getItem("DropingPoint");
    if (boarding) {
      dispatch(
        updateField({ field: "showDropingPoint", value: droping })
      );
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
  console.log(selectedBus);
  useEffect(() => {
    const initialpassengerDetails = {};
    selectedSeats[date]?.forEach((seatNumber) => {
      initialpassengerDetails[seatNumber] = { name: "", email: "", phone: "",status:"booked" };
    });
    setPassengerDetails(initialpassengerDetails);
  }, [selectedSeats, date]);
  const usenavigate = useNavigate();
  const [username, setUsername] = useState("");
  const [passengerDetails, setPassengerDetails] = useState({});
  function handleBookTicket() {
    if (selectedBus && date) {
      busDetails.map((bus) => {
        if (bus.id === selectedBus.id) {
          api.put(`${busUrl}/${bus.id}`, {
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
      usenavigate("/");
    }
    const time = Date.now();
    const ticketnumber = time;
    const totalPrice = selectedBus.price * selectedSeats[date].length;
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
    dispatch(
      updateField({
        field: "selectedSeats",
        value: { ...selectedSeats, [date]: [] },
      })
    );
    api
      .post(bookingUrl, newBooking)
      .then(() => {
        toast.success("Ticket booked.");
      })
      .catch((err) => {
        alert("Failed: " + err.message);
      });
  }
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div className="ticketBookingDetailsPage">
      <div className="container1">
        <NavigationBar />
      </div>
      <div className="container2">
        {date?
          <span className="destingationFont">{capitalizeFirstLetter(selectedBus.from)}&#8594;{capitalizeFirstLetter(selectedBus.to)}</span>:null }
      </div>
      <div className="passengerForm">
        <form onSubmit={() => handleBookTicket()}>
          {selectedSeats[date]?.map((seatNumber) => (
            <div key={seatNumber}>
              <p>Seat Number: {seatNumber}</p>
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
                title="phonenumber must contain 10 digit"
                pattern="[0-9]{10}"
              />
            </div>
          ))}
          <br />
          <center>
            <button className="bookTicketButton">Book ticket</button>
          </center>
        </form>
      </div>
    </div>
  );
}
