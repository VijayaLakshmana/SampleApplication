import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Api from "../../service/busService";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { updateField } from "../../Redux/BusDetails";
import { toast } from "react-toastify";
const busUrl = process.env.REACT_APP_BUS_URL;
export default function BusSeat() {
  const dispatch = useDispatch();
  useEffect(() => {
    const api = new Api();
    async function fetchData(){
      try {
        const response = await api.get(busUrl);
        dispatch(updateField({ field: "busDetails", value: response.data }));
      }
      catch (error) {
        toast.error("Error fetching data:", error);
      }
    }
    fetchData();
    const storedSelectedBus = sessionStorage.getItem("selectedBus");
    if (storedSelectedBus) {
      dispatch(
        updateField({
          field: "selectedBus",
          value: JSON.parse(storedSelectedBus),
        })
      );
    }
    const date = sessionStorage.getItem("date");
    dispatch(updateField({ field: "date", value: date }));
  }, []);
  const {
    date,
    busDetails,
    selectedBus,
    selectedSeats,
    showBoardingPoint,
    showDropingPoint,
  } = useSelector((state) => state.bus);
  const usenavigate = useNavigate();
  function isSeatSelected(seatNumber) {
    return selectedSeats[date]?.includes(seatNumber);
  }
  function isSeatBooked(bus, date, seatNumber) {
    const selectedBusData = busDetails.find((b) => b.id === bus.id);
    const selectedDateData = selectedBusData.dates.find((d) => d.date === date);
    return (
      selectedDateData && selectedDateData.bookedSeats.includes(seatNumber)
    );
  }
  function handleSeatClick(seatNumber) {
    const currentSelectedSeats = selectedSeats[date] || [];
    if (currentSelectedSeats.includes(seatNumber)) {
      const updatedSeats = currentSelectedSeats.filter(
        (seat) => seat !== seatNumber
      );
      dispatch(
        updateField({
          field: "selectedSeats",
          value: { ...selectedSeats, [date]: updatedSeats },
        })
      );
      sessionStorage.setItem(
        "selectedSeats",
        JSON.stringify({ ...selectedSeats, [date]: updatedSeats })
      );
    } else {
      const updatedSeats = [...currentSelectedSeats, seatNumber];
      dispatch(
        updateField({
          field: "selectedSeats",
          value: {
            ...selectedSeats,
            [date]: updatedSeats,
          },
        })
      );
      sessionStorage.setItem(
        "selectedSeats",
        JSON.stringify({ ...selectedSeats, [date]: updatedSeats })
      );
    }
  }
  function handleBookTickets() {
    if (!selectedSeats[date]?.length) {
      return toast.error("Select at least one seat to proceed");
    } else if (showDropingPoint.length === 0) {
      return toast.error("Give the Droping Point");
    } else if (showBoardingPoint.length === 0) {
      return toast.error("Give the Boarding Point");
    }
    dispatch(updateField({ field: "showBoardingPoint", value: showBoardingPoint }));
    sessionStorage.setItem("BoardingPoint",(showBoardingPoint));
    dispatch(updateField({ field: "showDropingPoint", value: showDropingPoint }));
    sessionStorage.setItem("DropingPoint",(showDropingPoint));
    usenavigate("bookticket");
  }
  return (
    <div >
      {busDetails.map((bus) =>
        bus.dates.map((dateObj) =>
          dateObj.date === date ? (
            <div key={dateObj.date}>
              {selectedBus.id === bus.id && date === dateObj.date && (
                <div>
                  <p>
                    Total Available Seats:
                    {bus.seat - dateObj.bookedSeats.length}
                  </p>
                  <select
                    value={showBoardingPoint}
                    onChange={(e) =>
                      dispatch(
                        updateField({
                          field: "showBoardingPoint",
                          value: e.target.value,
                        })
                      )
                    }
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
                    onChange={(e) =>
                      dispatch(
                        updateField({
                          field: "showDropingPoint",
                          value: e.target.value,
                        })
                      )
                    }
                  >
                    <option value="">select Droping Point</option>
                    {bus.dropingStop.map((point, index) => (
                      <option key={index} value={point.stopingPoint}>
                        {point.stopingPoint}-{point.time}
                      </option>
                    ))}
                  </select>
                  <br />
                  <br />
                  <div>
                    {Array.from(
                      { length: Math.ceil(bus.seat / 4) },
                      (_, rowIndex) => (
                        <div key={rowIndex} className="seatRow">
                          {Array.from({ length: 4 }, (_, seatIndex) => {
                            const seatNumber = rowIndex * 4 + seatIndex + 1;
                            return (
                              <>
                                <button
                                  key={seatNumber}
                                  onClick={() => handleSeatClick(seatNumber)}
                                  disabled={isSeatBooked(bus, date, seatNumber)}
                                  className={`${
                                    bus.isSeater
                                      ? "seatButton"
                                      : "seatRectangleButton"
                                  } ${
                                    isSeatBooked(bus, date, seatNumber)
                                      ? "disabled"
                                      : ""
                                  } ${
                                    isSeatSelected(seatNumber) ? "selected" : ""
                                  }`}
                                >
                                  {seatNumber}
                                </button>
                                {(seatIndex + 1) % 2 === 0 && (
                                  <div style={{ width: "20px" }}></div>
                                )}
                              </>
                            );
                          })}
                        </div>
                      )
                    )}
                  </div>

                  <button
                    onClick={handleBookTickets}
                    disabled={!selectedSeats[date]?.length}
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
