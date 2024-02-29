import "./HomePage.css";
import NavigationBar from "./NavigationBar";
import SearchField from "./SearchField";
export default function HomePage(props) {
  return (
    <>
      <div className="layout">
        <div className="content1">
          <NavigationBar />
        </div>
        <div className="content2">
          <h3>Bus Ticket Booking </h3>
          <SearchField
            from={props.from}
            setFrom={props.setFrom}
            to={props.to}
            setTo={props.setTo}
            date={props.date}
            setDate={props.setDate}
          />
        </div>
        <div className="content3">
          
        </div>
      </div>
    </>
  );
}
