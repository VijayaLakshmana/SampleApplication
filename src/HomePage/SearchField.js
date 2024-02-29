import { useNavigate } from "react-router-dom";
import InputField from "./Input";
export default function SearchField(props) {
  const currentDate = new Date().toISOString().slice(0, 10);
  const endOfNextMonth = new Date();
  endOfNextMonth.setMonth(endOfNextMonth.getMonth() + 2, 0);
  const maxSelectableDate = endOfNextMonth.toISOString().slice(0, 10);
  const usenavigate = useNavigate();
  let link;
  function handleClick(e) {
    e.preventDefault();
    if (props.from !== props.to) {
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
          value={props.from}
          onChange={(e) => props.setFrom(e.target.value.toLowerCase())}
          className="icon1"
          placeholder="From"
          name="from"
        />
        <InputField
          type="text"
          value={props.to}
          onChange={(e) => props.setTo(e.target.value.toLowerCase())}
          className="icon2"
          placeholder="To"
          name="to"
        />
        <input
          type="date"
          value={props.date}
          onChange={(e) => props.setDate(e.target.value)}
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
