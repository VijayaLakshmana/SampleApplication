import SignUp from "./component/SignUp/SignUp";
import HomePage from "./component/HomePage/HomePage";
import Login from "./component/LoginPage/Login";
import Search from "./component/Search/Search";
import TicketBooking from "./component/BookTicket/BookTicket";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [localFrom, setLocalFrom] = useState("");
  const [localTo, setLocalTo] = useState("");
  const [localDate, setLocalDate] = useState("");
  const [busDetails, setBusDetails] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState({});
  const [selectedBus, setSelectedBus] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                from={from}
                setFrom={setFrom}
                to={to}
                setTo={setTo}
                date={date}
                setDate={setDate}
                localFrom={localFrom}
                setLocalFrom={setLocalFrom}
                localTo={localTo}
                setLocalTo={setLocalTo}
                localDate={localDate}
                setLocalDate={setLocalDate}
              />
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
          <Route
            path="/search"
            element={
              <Search
                from={from}
                setFrom={setFrom}
                to={to}
                setTo={setTo}
                date={date}
                setDate={setDate}
                localFrom={localFrom}
                setLocalFrom={setLocalFrom}
                localTo={localTo}
                setLocalTo={setLocalTo}
                localDate={localDate}
                setLocalDate={setLocalDate}
                busDetails={busDetails}
                setBusDetails={setBusDetails}
                selectedBus={selectedBus}
                setSelectedBus={setSelectedBus}
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
              />
            }
          ></Route>
          <Route
            path="/search/bookticket"
            element={
              <TicketBooking
                date={date}
                setDate={setDate}
                busDetails={busDetails}
                setBusDetails={setBusDetails}
                selectedBus={selectedBus}
                setSelectedBus={setSelectedBus}
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
