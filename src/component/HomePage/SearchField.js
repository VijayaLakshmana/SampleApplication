import { useNavigate } from "react-router-dom";
import InputField from "./Input";
import { useEffect } from "react";
export default function SearchField(props) {
  const currentDate = new Date().toISOString().slice(0, 10);
  const endOfNextMonth = new Date();
  endOfNextMonth.setMonth(endOfNextMonth.getMonth() + 2, 0);
  const maxSelectableDate = endOfNextMonth.toISOString().slice(0, 10);
  const usenavigate = useNavigate();
  let link;
  useEffect(() => {
    const storedFrom = sessionStorage.getItem("from");
    const storedTo = sessionStorage.getItem("to");
    const storedDate = sessionStorage.getItem("date");
    if (storedFrom) {
      props.setLocalFrom(storedFrom);
    }
    if (storedTo) {
      props.setLocalTo(storedTo);
    }
    if (storedDate) {
      props.setLocalDate(storedDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClick(e) {
    e.preventDefault();
    sessionStorage.setItem("from", props.localFrom);
    sessionStorage.setItem("to", props.localTo);
    sessionStorage.setItem("date", props.localDate);
    const from = sessionStorage.getItem("from");
    const to = sessionStorage.getItem("to");
    const date = sessionStorage.getItem("date");
    props.setFrom(from);
    props.setTo(to);
    props.setDate(date);
    if (props.localFrom !== props.localTo) {
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
          value={props.localFrom}
          onChange={(e) => props.setLocalFrom(e.target.value.toLowerCase())}
          className="icon1"
          placeholder="From"
          name="from"
        />
        <InputField
          type="text"
          value={props.localTo}
          onChange={(e) => props.setLocalTo(e.target.value.toLowerCase())}
          className="icon2"
          placeholder="To"
          name="to"
        />
        <input
          type="date"
          value={props.localDate}
          onChange={(e) => props.setLocalDate(e.target.value)}
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
