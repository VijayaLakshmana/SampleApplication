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
      props.setFrom(props.localFrom)
      props.setTo(props.localTo)
      props.setDate(props.localDate)
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
          onChange={(e)=>props.setLocalFrom(e.target.value.toLowerCase())}
          className="icon1"
          placeholder="From"
          name="from"
        />
        <InputField
          type="text"
          value={props.localTo}
          onChange={(e)=>props.setLocalTo(e.target.value.toLowerCase())}
          className="icon2"
          placeholder="To"
          name="to"
        />
        <input
          type="date"
          value={props.localDate}
          onChange={(e)=>props.setLocalDate(e.target.value)}
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
