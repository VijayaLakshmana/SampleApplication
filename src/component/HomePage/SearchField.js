import { useNavigate } from "react-router-dom";
import InputField from "./Input";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFrom, setTo, setDate } from "../../BusDetails";
import React from "react";
export default function SearchField() {
  const [localFrom, setLocalFrom] = useState("");
  const [localTo, setLocalTo] = useState("");
  const [localDate, setLocalDate] = useState("");
  const currentDate = new Date().toISOString().slice(0, 10);
  const endOfNextMonth = new Date();
  endOfNextMonth.setMonth(endOfNextMonth.getMonth() + 2, 0);
  const maxSelectableDate = endOfNextMonth.toISOString().slice(0, 10);
  const usenavigate = useNavigate();
  let link;
  const dispatch = useDispatch();
  useEffect(() => {
    const storedFrom = sessionStorage.getItem("from");
    const storedTo = sessionStorage.getItem("to");
    const storedDate = sessionStorage.getItem("date");
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

  function handleClick(e) {
    e.preventDefault();
    sessionStorage.setItem("from", localFrom);
    sessionStorage.setItem("to", localTo);
    sessionStorage.setItem("date", localDate);
    const from = sessionStorage.getItem("from");
    const to = sessionStorage.getItem("to");
    const date = sessionStorage.getItem("date");
    dispatch(setFrom(from));
    dispatch(setTo(to));
    dispatch(setDate(date));
    if (localFrom !== localTo) {
      link = "/search";
    } else {
      link = "/";
      alert("Give proper input details..");
    }
    usenavigate(`${link}`);
  }
  return (
    <>
      <form className="searchform" onSubmit={(e) => handleClick(e)}>
        <InputField
          type="text"
          value={localFrom}
          onChange={(e) => setLocalFrom(e.target.value.toLowerCase())}
          className="icon1"
          placeholder="From"
          name="from"
        />
        <InputField
          type="text"
          value={localTo}
          onChange={(e) => setLocalTo(e.target.value.toLowerCase())}
          className="icon2"
          placeholder="To"
          name="to"
        />
        <input
          type="date"
          value={localDate}
          onChange={(e) => setLocalDate(e.target.value)}
          min={currentDate}
          max={maxSelectableDate}
          className="icon3"
          name="date"
          required
        />
        <button className="searchButton">search</button>
      </form>
    </>
  );
}
