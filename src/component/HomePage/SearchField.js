import { useNavigate } from "react-router-dom";
import InputField from "./Input";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../Redux/BusDetails";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BusSearchService from "../../service/SearchService";
import "./HomePage.css";
export default React.memo(function SearchField() {
  const [localFrom, setLocalFrom] = useState("");
  const [localTo, setLocalTo] = useState("");
  const [localDate, setLocalDate] = useState("");
  const currentDate = new Date().toISOString().slice(0, 10);
  const endOfNextMonth = new Date();
  endOfNextMonth.setMonth(endOfNextMonth.getMonth() + 2, 0);
  const maxSelectableDate = endOfNextMonth.toISOString().slice(0, 10);
  const usenavigate = useNavigate();
  const dispatch = useDispatch();
  const destination = new Set();
  const { busDetails } = useSelector((state) => state.bus);
  useEffect(() => {
    const busSearchService = new BusSearchService();
    const storedFrom = sessionStorage.getItem("from");
    const storedTo = sessionStorage.getItem("to");
    const storedDate = sessionStorage.getItem("date");
    busSearchService.busData(dispatch, toast);
    if (storedFrom) {
      setLocalFrom(storedFrom);
    }
    if (storedTo) {
      setLocalTo(storedTo);
    }
    if (storedDate) {
      setLocalDate(storedDate);
    }
  }, []);
  busDetails.forEach(
    (bus) => destination.add(bus.to) && destination.add(bus.from)
  );
  const destination1 = Array.from(destination);
  function handleClick(e) {
    e.preventDefault();
    sessionStorage.setItem("from", localFrom);
    sessionStorage.setItem("to", localTo);
    sessionStorage.setItem("date", localDate);
    const from = sessionStorage.getItem("from");
    const to = sessionStorage.getItem("to");
    const date = sessionStorage.getItem("date");
    dispatch(updateField({ field: "from", value: from }));
    dispatch(updateField({ field: "to", value: to }));
    dispatch(updateField({ field: "date", value: date }));
    let link;
    if (localFrom !== localTo) {
      link = "/search";
    } else {
      link = "/";
      alert("Give proper input details..");
    }
    usenavigate(`${link}`);
  }
  return (
    <form className="searchform" onSubmit={(e) => handleClick(e)} autoComplete="off">
      <InputField
        type="text"
        value={localFrom}
        onChange={(e) => setLocalFrom(e.target.value.toLowerCase())}
        className="icon1"
        placeholder="From"
        name="from"
        list="from"
      />
      <datalist id="from">
        {destination1.map((place, i) => (
          <div key={i}>{
            localTo!==place?<option value={place} key={i}></option>:null
          }</div>
        ))}
      </datalist>
      <InputField
        type="text"
        value={localTo}
        onChange={(e) => setLocalTo(e.target.value.toLowerCase())}
        className="icon2"
        placeholder="To"
        name="to"
        list="to"
      />
      <datalist id="to">
        {destination1.map((place, i) => (
          <div key={i}>{
            localFrom!==place?<option value={place} key={i}></option>:null
          }</div>
        ))}
      </datalist>
      <input
        type="date"
        value={localDate}
        onChange={(e) => setLocalDate(e.target.value)}
        min={currentDate}
        max={maxSelectableDate}
        className="icon3"
        id="date"
        data-testid="date-input"
        name="date"
        placeholder="Date"
        required
      />
      <button className="searchButton">search</button>
    </form>
  );
});
