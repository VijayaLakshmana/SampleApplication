import { useEffect, useState } from "react";
import NavigationBar from "../HomePage/NavigationBar";
import SearchField from "../HomePage/SearchField";
import InputField from "../HomePage/Input";
import "./search.css";
import { useNavigate } from "react-router-dom";

export default function Search(props) {
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

  const usenavigate = useNavigate();
  let busseat = "busseat";
  useEffect(() => {
    fetch("http://localhost:3001/bus")
      .then((res) => res.json())
      .then((res) => props.setBusDetails([...res]));
    const from = sessionStorage.getItem("from");
    props.setFrom(from);
    const to = sessionStorage.getItem("to");
    props.setTo(to);
    const date = sessionStorage.getItem("date");
    props.setDate(date);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const filterBusType = props.busDetails.filter((bus) => {
    const showBus = (showACBus && bus.AC) || (showNonACBus && !bus.AC);
    const anyFilterActive = showACBus || showNonACBus;
    return anyFilterActive ? showBus : true;
  });
  const filterSeaterType = filterBusType.filter((bus) => {
    const showBus =
      (showSeaterBus && bus.isSeater) || (showNonSeaterBus && !bus.isSeater);
    const anyFilterActive = showSeaterBus || showNonSeaterBus;
    return anyFilterActive ? showBus : true;
  });
  const filteredStop = filterSeaterType.filter((bus) => {
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
    (bus) => props.from === bus.from && props.to === bus.to && props.date
  );
  async function handleShowSeats(bus) {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      return alert("Login in before Book Tickets");
    }
    props.setSelectedBus(bus);
    sessionStorage.setItem("selectedBus", JSON.stringify(bus));
    usenavigate(`${busseat}`);
  }
  props.busDetails.forEach((bus) => {
    if (
      bus.dates.length === 0 ||
      !bus.dates.find((dateObj) => dateObj.date === props.date)
    ) {
      fetch(`http://localhost:3001/bus/${bus.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...bus,
          dates: [...bus.dates, { date: props.date, bookedSeats: [] }],
        }),
      });
    }
  });
  props.busDetails.forEach((bus) => {
    if (
      bus.dates.length === 0 ||
      !bus.dates.find((dateObj) => dateObj.date === props.date)
    ) {
      bus.dates.push({ date: props.date, bookedSeats: [] });
    }
  });
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
          localFrom={props.localFrom}
          setLocalFrom={props.setLocalFrom}
          localTo={props.localTo}
          setLocalTo={props.setLocalTo}
          localDate={props.localDate}
          setLocalDate={props.setLocalDate}
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
          <label>AC</label>
          <InputField
            type="checkbox"
            checked={showNonACBus}
            onChange={() => setShowNonACBus(!showNonACBus)}
            id="nonac"
            name="nonac"
          />
          <label>NON AC</label>
          <InputField
            type="checkbox"
            checked={showSeaterBus}
            onChange={() => setShowSeaterBus(!showSeaterBus)}
            id="seater"
            name="seater"
          />
          <label>seater</label>
          <InputField
            type="checkbox"
            checked={showNonSeaterBus}
            onChange={() => setShowNonSeaterBus(!showNonSeaterBus)}
            id="sleeper"
            name="sleeper"
          />
          <label>sleeper</label>
          <br />
          <br />
          <h4>Select Boarding Points:</h4>
          {props.busDetails
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
          {props.busDetails
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
            {props.busDetails
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
            {props.busDetails
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
                      {bus.AC ? <span>Ac</span> : <span>NonAc</span>}
                      {bus.isSeater ? (
                        <span>seater</span>
                      ) : (
                        <span>sleeper</span>
                      )}
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
                    <button onClick={() => handleShowSeats(bus)}>
                      bookticket
                    </button>
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
