import React from "react";
import SignUp from "./component/SignUp/SignUp";
import HomePage from "./component/HomePage/HomePage";
import Login from "./component/LoginPage/Login";
import Search from "./component/Search/Search";
import TicketBooking from "./component/BookTicket/BookTicket";
import BusSeat from "./component/Search/BusSeat";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyBookings from "./component/MyBookings/MyBooking";
import CancelTicket from "./component/CancelTicket/CancelTicket";
import PrivateRoute from "./component/HomePage/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/mybookings"
              element={
                <PrivateRoute>
                  <MyBookings />
                </PrivateRoute>
              }
            />
            <Route path="/mybookings/ticketcancel" element={<PrivateRoute><CancelTicket /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/search/busseat/bookticket"
              element={<PrivateRoute><TicketBooking /></PrivateRoute>}
            />
            <Route path="/search/busseat" element={<PrivateRoute><BusSeat /></PrivateRoute>} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
