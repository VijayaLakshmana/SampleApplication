// import { AppContext } from "../../Context";
import "./HomePage.css";
import NavigationBar from "./NavigationBar";
import SearchField from "./SearchField";
// import { useContext } from "react";
export default function HomePage() {
  // const { from, setFrom, to, setTo, date, setDate } = useContext(AppContext);

  // const value=useSelector(state=>state.bus)
  // console.log(val);
  return (
    <div>
      <div className="layout">
        <div className="content1">
          <NavigationBar />
        </div>
        <div className="content2">
          <h3>Book Your Tickets </h3>
          <SearchField
            // from={from}
            // setFrom={dispatch(setFrom())}
            // to={to}
            // setTo={dispatch(setTo())}
            // date={date}
            // setDate={dispatch(setDate())}
          />
        </div>
        <div className="content3">
          <h1 className="heading">RJ Travels</h1>
          <p className="para">Books us for a safe and relax journey!</p>
        </div>
      </div>
    </div>
  );
}
