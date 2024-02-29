import { useEffect, useState } from "react";
import NavigationBar from "../HomePage/NavigationBar";
import SearchField from "../HomePage/SearchField";
import "./search.css";

export default function Search(props) {
  const [busDetails, setBusDetails] = useState([]);
  const [busType, setBusType] = useState();
  useEffect(() => {
    fetch("http://localhost:3001/bus")
      .then((res) => res.json())
      .then((res) => setBusDetails([...res]));
  }, []);
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  console.log(busType);

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
          <h4>Bus type</h4>
          <input
            type="checkbox"
            checked={busType===true}
            onChange={(e) => setBusType(!busType)}
            id="ac"
            name="ac"
            value="true"
          />
          <label for="ac">AC</label>
          <input
            type="checkbox"
            checked={busType===false}
            onChange={(e) => setBusType(!busType)}
            id="nonac"
            name="ac"
            value="false"
          />
          <label for="nonac">NON AC</label>
        </div>
      </div>
      <div className="component4">
        <div>
          {busDetails.map((v) => (
            <div>
              {props.from === v.from && props.to === v.to ? (
              
                <div className="busContent">
                  <div className="busName">
                    {v.busname}
                    <div className="acList">
                      {v.ac ? <b>AC</b> : <b>Non AC</b>}
                    </div>
                  </div>
                  <div className="fromTiming">
                    {v.fromTiming}
                    <div className="from">{capitalizeFirstLetter(v.from)}</div>
                  </div>
                  <div className="busHours">{v.hrs}</div>
                  <div className="toTiming">
                    {v.toTiming}
                    <div className="to">{capitalizeFirstLetter(v.to)}</div>
                  </div>
                  <div className="price">Inr: {v.price}</div>
                  <div className="totalSeats">
                    Total: {v.seat}seats
                    <div className="seatBook">
                      <button>click to book</button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
