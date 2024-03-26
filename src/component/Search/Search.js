import { useEffect, useState } from "react";
import React from "react";
import NavigationBar from "../HomePage/NavigationBar";
import SearchField from "../HomePage/SearchField";
import InputField from "../HomePage/Input";
import "./search.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../../Utils/Utils";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Api from "../../service/busService";
import { updateField } from "../../Redux/BusDetails";
import PointCheckboxList from "./PointsCheckboxList";
export default function Search() {
  const [showACBus, setShowACBus] = useState(false);
  const [showNonACBus, setShowNonACBus] = useState(false);
  const [showSeaterBus, setShowSeaterBus] = useState(false);
  const [showNonSeaterBus, setShowNonSeaterBus] = useState(false);
  const [selectBoardingPoint, setSelectBoardingPoint] = useState([]);
  const [selectDropingPoint, setSelectDropingPoint] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const dispatch = useDispatch();
  const { from, to, date, busDetails } = useSelector((state) => state.bus);
  const usenavigate = useNavigate();
  const busUrl = process.env.REACT_APP_BUS_URL;
  const api = new Api();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(busUrl);
        dispatch(updateField({ field: "busDetails", value: response.data }));
      } catch (error) {
        toast.error("Error fetching data:", error);
      }
    }
    fetchData();
    const from = sessionStorage.getItem("from");
    dispatch(updateField({ field: "from", value: from }));
    const to = sessionStorage.getItem("to");
    dispatch(updateField({ field: "to", value: to }));
    const date = sessionStorage.getItem("date");
    dispatch(updateField({ field: "date", value: date }));
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
  const filteredSearch = filterSeaterType.filter((bus) => {
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
  function handleShowSeats(bus) {
    const username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      return toast.error("Login in before Book Tickets");
    }
    dispatch(updateField({ field: "selectedBus", value: bus }));
    sessionStorage.setItem("selectedBus", JSON.stringify(bus));
    usenavigate("busseat");
  }
  const pointLists = [
    {
      title: "Select Boarding Points:",
      points: selectBoardingPoint,
      handlePointChange: handleBoardingPointChange,
      stopType: "boardingStop",
    },
    {
      title: "Select Dropping Points:",
      points: selectDropingPoint,
      handlePointChange: handleDropingPointChange,
      stopType: "dropingStop",
    },
  ];

  busDetails.forEach((bus) => {
    if (
      bus.dates.length === 0 ||
      !bus.dates.find((dateObj) => dateObj.date === date)
    ) {
      api.put(`${busUrl}/${bus.id}`, {
        ...bus,
        dates: [...bus.dates, { date: date, bookedSeats: [] }],
      });
    }
  });
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
          {pointLists.map((pointList, index) => (
            <div key={index}>
              <h4>{pointList.title}</h4>
              <PointCheckboxList
                busDetails={busDetails}
                from={from}
                to={to}
                selectPoints={pointList.points}
                handlePointChange={pointList.handlePointChange}
                stopType={pointList.stopType}
              />
              <br />
            </div>
          ))}
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
      <div className="component4" id="scrollable-container">
        <div>
          {filteredSearch.length > 0 ? (
            <div>
              {filteredSearch.map((bus) => (
                <div
                  className="busContent"
                  key={bus.id}
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
                    <div>
                      <br />
                      <button onClick={() => handleShowSeats(bus)}>
                        Book Ticket
                      </button>
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
