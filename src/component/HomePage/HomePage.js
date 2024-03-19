import "./HomePage.css";
import NavigationBar from "./NavigationBar";
import SearchField from "./SearchField";
import React from "react";
export default function HomePage() {
  return (
    <div>
      <div className="layout">
        <div className="content1">
          <NavigationBar />
        </div>
        <div className="content2">
          <h3>Book Your Tickets </h3>
          <SearchField />
        </div>
        <div className="content3">
          <h1 className="heading">RJ Travels</h1>
          <p className="para">Books us for a safe and relax journey!</p>
        </div>
      </div>
    </div>
  );
}
