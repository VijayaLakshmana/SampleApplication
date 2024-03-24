import { useEffect, useState } from "react";
import React from "react";
import NavigationBar from "../HomePage/NavigationBar";
import SearchField from "../HomePage/SearchField";
import InputField from "../HomePage/Input";
import "./search.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../HomePage/Utils";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Api from "../../service/busService";
import { updateField } from "../../BusDetails";
export default function Search() {
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
  const dispatch = useDispatch();
  const { from, to, date, busDetails } = useSelector((state) => state.bus);
  const usenavigate = useNavigate();
  const busseat = "busseat";
  const busUrl = process.env.REACT_APP_BUS_URL;
  const api = new Api();
  useEffect(() => {
    api
      .get(busUrl)
      .then((response) => {
        dispatch(updateField({ field: "busDetails", value: response.data }));
      })
      .catch((error) => {
        console.error("Error fetching bus data:", error);
      });
    const from = sessionStorage.getItem("from");
    dispatch(updateField({ field: "from", value: from }));
    const to = sessionStorage.getItem("to");
    dispatch(updateField({ field: "to", value: to }));
    const date = sessionStorage.getItem("date");
    dispatch(updateField({ field: "date", value: date }));
  }, []);
  console.log();
  console.log(busDetails);
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
  const filteredLocation = busDetails.filter(
    (bus) => from === bus.from && to === bus.to && date
  );
  const filterBusType = filteredLocation.filter((bus) => {
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
  const filteredSearch = filteredStop.filter((bus) => {
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

  function handleShowSeats(bus) {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      return toast.error("Login in before Book Tickets");
    }
    dispatch(updateField({ field: "selectedBus", value: bus }));
    sessionStorage.setItem("selectedBus", JSON.stringify(bus));
    usenavigate(`${busseat}`);
  }
  busDetails.forEach((bus) => {
    if (
      bus.dates.length === 0 ||
      !bus.dates.find((dateObj) => dateObj.date === date)
    ) {
      api
        .put(`${busUrl}/${bus.id}`, {
          ...bus,
          dates: [...bus.dates, { date: date, bookedSeats: [] }],
        })
        .then(() => console.log(`Updated bus ${bus.id} with new date`))
        .catch((error) =>
          console.error(`Failed to update bus ${bus.id}:`, error)
        );
    }
  });
  console.log(busDetails);
  return (
    <div className="searchLayout">
      <div className="component1">
        <NavigationBar />
      </div>
      <div className="component2">
        <SearchField />
      </div>
      <div className="component3">
        <div className="filterContent">
          <h4>Bus type:</h4>
          <label>
            <InputField
              type="checkbox"
              checked={showACBus}
              onChange={() => setShowACBus(!showACBus)}
              id="ac"
              name="ac"
            />
            AC
          </label>
          <label>
            <InputField
              type="checkbox"
              checked={showNonACBus}
              onChange={() => setShowNonACBus(!showNonACBus)}
              id="nonac"
              name="nonac"
            />
            NONAC
          </label>
          <label>
            <InputField
              type="checkbox"
              checked={showSeaterBus}
              onChange={() => setShowSeaterBus(!showSeaterBus)}
              id="seater"
              name="seater"
            />
            seater
          </label>
          <label>
            <InputField
              type="checkbox"
              checked={showNonSeaterBus}
              onChange={() => setShowNonSeaterBus(!showNonSeaterBus)}
              id="sleeper"
              name="sleeper"
            />
            sleeper
          </label>
          <br />
          <br />
          <h4>Select Boarding Points:</h4>
          {busDetails
            .filter((bus) => bus.from === from && bus.to === to)
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
            .filter((bus) => bus.to === to)
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
              .filter((bus) => bus.from === from)
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
              .filter((bus) => bus.to === to)
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
          <label>
            <InputField
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            Min Price:{" "}
          </label>
          <br />
          <label>
            <InputField
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            Max Price:
          </label>
        </div>
      </div>
      <div className="component4">
        <div>
          {filteredSearch.length > 0 ? (
            <div>
              {filteredSearch.map((bus, index) => (
                <div
                  className="busContent"
                  key={bus.id}
                  data-testid={`bus-name-${index}`}
                >
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
                  <div className="price">{formatPrice(bus.price)}</div>
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