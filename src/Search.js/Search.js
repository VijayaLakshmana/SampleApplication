import { useEffect, useState } from "react";
import NavigationBar from "../HomePage/NavigationBar";
import SearchField from "../HomePage/SearchField";
import InputField from "../HomePage/Input";
import "./search.css";

export default function Search(props) {
  const [busDetails, setBusDetails] = useState([]);
  const [showACBus, setShowACBus] = useState(false);
  const [showNonACBus, setShowNonACBus] = useState(false);
  const [showSeaterBus, setShowSeaterBus] = useState(false);
  const [showNonSeaterBus, setShowNonSeaterBus] = useState(false);
  const [selectBoardingPoint, setSelectBoardingPoint] = useState([]);
  const [selectDropingPoint, setSelectDropingPoint] = useState([]);
  const [selectBoardingTime, setSelectBoardingTime] = useState("");
  const [selectDropingTime, setSelectDropingTime] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  useEffect(() => {
    fetch("http://localhost:3001/bus")
      .then((res) => res.json())
      .then((res) => setBusDetails([...res]));
  }, []);
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function handleBoardingPointChange(event) {
    const value = event.target.value;
    if (selectBoardingPoint.includes(value)) {
      setSelectBoardingPoint(
        selectBoardingPoint.filter((point) => point !== value)
      );
    } else {
      setSelectBoardingPoint([...selectBoardingPoint, value]);
    }
  }
  function handleDropingPointChange(event) {
    const value = event.target.value;
    if (selectDropingPoint.includes(value)) {
      setSelectDropingPoint(
        selectDropingPoint.filter((point) => point !== value)
      );
    } else {
      setSelectDropingPoint([...selectDropingPoint, value]);
    }
  }
  console.log(selectBoardingPoint);
  const filterBusType = busDetails.filter((bus) => {
    const showBus =
      (showACBus && bus.AC) ||
      (showNonACBus && !bus.AC) ||
      (showSeaterBus && bus.isSeater) ||
      (showNonSeaterBus && !bus.isSeater);

    const anyFilterActive =
      showACBus || showNonACBus || showSeaterBus || showNonSeaterBus;
    return anyFilterActive ? showBus : true;
  });
  const filteredStop = filterBusType.filter((bus) => {
    const hasSelectBoardingPoint =
      selectBoardingPoint.length === 0 ||
      bus.boardingStop.some((stop) =>
        selectBoardingPoint.includes(stop.stopingPoint)
      );
    const hasSelectDropingPoint =
      selectDropingPoint.length === 0 ||
      bus.dropingStop.some((stop) =>
        selectDropingPoint.includes(stop.stopingPoint)
      );
    const priceRange =
      (minPrice === "" || bus.price >= minPrice) &&
      (maxPrice === "" || bus.price <= maxPrice);

    const anyFilterActive =
      selectBoardingPoint.length > 0 ||
      selectDropingPoint.length > 0 ||
      minPrice !== "" ||
      maxPrice !== "";
    return anyFilterActive
      ? hasSelectBoardingPoint && hasSelectDropingPoint && priceRange
      : true;
  });
  const filteredBuses = filteredStop.filter((bus) => {
    const hasSelectBoardingTime =
      selectBoardingTime === "" ||
      bus.boardingStop.some((stop) => stop.time === selectBoardingTime);
    const hasSelectDropingTime =
      selectDropingTime === "" ||
      bus.dropingStop.some((stop) => stop.time === selectDropingTime);
    const anyFilterActive = selectBoardingTime.length > 0 || selectDropingTime;
    return anyFilterActive
      ? hasSelectBoardingTime && hasSelectDropingTime
      : true;
  });
  const filteredSearch = filteredBuses.filter(
    (bus) => props.from === bus.from && props.to === bus.to
  );
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [seatSelectionVisible, setSeatSelectionVisible] = useState(false);
  function handleShowSeats(bus) {
    setSelectedBus(bus);
    setSelectedSeats([]);
    setSeatSelectionVisible(!seatSelectionVisible);
  }
  function isSeatSelected(seatNumber) {
    return selectedSeats.includes(seatNumber);
  }
  function handleSeatClick(seatNumber) {
    if (isSeatSelected(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  }
  function handleBookTickets() {
    if (selectedSeats.length === 0) {
      alert("please select at least one seat to book ticket.");
      return;
    }
    const busIndex = busDetails.findIndex((bus) => bus.id === selectedBus.id);
    if (busIndex !== -1) {
      const updatedBus = { ...busDetails[busIndex] };
      updatedBus.bookedSeats = [...updatedBus.bookedSeats, ...selectedSeats];
      const updatedBusData = [...busDetails];
      updatedBusData[busIndex] = updatedBus;
      setBusDetails(updatedBusData);
      alert(`slected seats:${selectedSeats}`);
    }
    setSelectedSeats([]);
    setSeatSelectionVisible(!seatSelectionVisible);
  }
  return (
    <div className="searchLayout">
      <div className="component1">
        <NavigationBar />
      </div>
      <div className="component2">
        <SearchField
          from={props.from}
          setFrom={props.setFrom}
          to={props.to}
          setTo={props.setTo}
          date={props.date}
          setDate={props.setDate}
        />
      </div>
      <div className="component3">
        <div className="filterContent">
          <h4>Bus type:</h4>
          <InputField
            type="checkbox"
            checked={showACBus}
            onChange={() => setShowACBus(!showACBus)}
            id="ac"
            name="ac"
          />
          <label for="ac">AC</label>
          <InputField
            type="checkbox"
            checked={showNonACBus}
            onChange={() => setShowNonACBus(!showNonACBus)}
            id="nonac"
            name="nonac"
          />
          <label for="nonac">NON AC</label>
          <InputField
            type="checkbox"
            checked={showSeaterBus}
            onChange={() => setShowSeaterBus(!showSeaterBus)}
            id="seater"
            name="seater"
          />
          <label for="seater">seater</label>
          <InputField
            type="checkbox"
            checked={showNonSeaterBus}
            onChange={() => setShowNonSeaterBus(!showNonSeaterBus)}
            id="sleeper"
            name="sleeper"
          />
          <label for="sleeper">sleeper</label>
          <br />
          <br />
          <h4>Select Boarding Points:</h4>
          {busDetails
            .filter((bus) => bus.from === props.from && bus.to === props.to)
            .flatMap((bus) => bus.boardingStop.map((stop) => stop.stopingPoint))
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((point) => (
              <label key={point}>
                <InputField
                  type="checkbox"
                  value={point}
                  checked={selectBoardingPoint.includes(point)}
                  onChange={handleBoardingPointChange}
                />
                {point}
                <br />
              </label>
            ))}
          <br />
          <h4>Select Droping Points:</h4>
          {busDetails
            .filter((bus) => bus.to === props.to)
            .flatMap((bus) => bus.dropingStop.map((stop) => stop.stopingPoint))
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((point) => (
              <label key={point}>
                <InputField
                  type="checkbox"
                  value={point}
                  checked={selectDropingPoint.includes(point)}
                  onChange={handleDropingPointChange}
                />
                {point}
                <br />
              </label>
            ))}
          <br />
          <h4>Select Boarding Time:</h4>
          <select
            value={selectBoardingTime}
            onChange={(e) => setSelectBoardingTime(e.target.value)}
          >
            <option value="">Select Time</option>
            {busDetails
              .filter((bus) => bus.from === props.from)
              .flatMap((bus) => bus.boardingStop.map((stop) => stop.time))
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
          </select>
          <br />
          <h4>Select Droping Time:</h4>
          <select
            value={selectDropingTime}
            onChange={(e) => setSelectDropingTime(e.target.value)}
          >
            <option value="">Select Time</option>
            {busDetails
              .filter((bus) => bus.to === props.to)
              .flatMap((bus) => bus.dropingStop.map((stop) => stop.time))
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
          </select>
          <br />
          <h4>Price Range:</h4>
          <label> Min Price: </label>
          <InputField
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <br />
          <label>Max Price:</label>
          <InputField
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="component4">
        <div>
          {filteredSearch.length > 0 ? (
            <div>
              {filteredSearch.map((bus) => (
                <div className="busContent" key={bus.id}>
                  <div className="busName">
                    {bus.busname}
                    <div className="acList">
                      {(bus.AC ? <span>Ac</span> : <span>NonAc</span>)}
                      {(bus.isSeater ? (
                        <span>seater</span>
                      ) : (
                        <span>sleeper</span>
                      ))}
                    </div>
                  </div>
                  <div className="fromTiming">
                    {bus.fromTiming}
                    <div className="from">
                      {capitalizeFirstLetter(bus.from)}
                    </div>
                  </div>
                  <div className="busHours">{bus.hrs}</div>
                  <div className="toTiming">
                    {bus.toTiming}
                    <div className="to">{capitalizeFirstLetter(bus.to)}</div>
                  </div>
                  <div className="price">Inr: {bus.price}</div>
                  <div className="totalSeats">
                    Total: {bus.seat}seats
                    <div className="seatBook">
                      <button onClick={() => handleShowSeats(bus)}>
                        {seatSelectionVisible &&
                        selectedBus &&
                        selectedBus.id === bus.id
                          ? "Hide Seat"
                          : "Book Seat"}
                      </button>
                      {seatSelectionVisible &&
                        selectedBus &&
                        selectedBus.id === bus.id && (
                          <div>
                            <p>
                              Total Available Seats:
                              {bus.seat - bus.bookedSeats.length}
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                              {[...Array(bus.seat)].map((_, index) => (
                                <button
                                  key={index + 1}
                                  disabled={bus.bookedSeats.includes(index + 1)}
                                  onClick={() => handleSeatClick(index + 1)}
                                  style={{
                                    margin: "5px",
                                    width: "30px",
                                    height: "30px",
                                    backgroundColor: isSeatSelected(index + 1)
                                      ? "blue"
                                      : bus.bookedSeats.includes(index + 1)
                                      ? "red"
                                      : "green",
                                    color: "white",
                                  }}
                                >
                                  {index + 1}
                                </button>
                              ))}
                            </div>
                            <button
                              onClick={handleBookTickets}
                              disabled={selectedSeats.length === 0}
                            >
                              Book Tickets
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h3>
              <center>Bus Not Available!</center>
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}
