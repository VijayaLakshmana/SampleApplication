import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Search from "./Search";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import "@testing-library/jest-dom";

jest.mock("./search.css", () => ({}));
const mockStore = configureStore([]);
const mockBusDetails = [
  {
    id: "0",
    busname: "Tvs travel",
    from: "tirunelveli",
    to: "madurai",
    boardingStop: [
      {
        stopingPoint: "New Bus Stand",
        time: "12:00pm",
      },
      {
        stopingPoint: "Vannarpettai",
        time: "12:10pm",
      },
    ],
    dropingStop: [
      {
        stopingPoint: "Mattuthavani",
        time: "21:50pm",
      },
      {
        stopingPoint: "Aarappalyam",
        time: "21:55pm",
      },
      {
        stopingPoint: "Thirumangalam",
        time: "22:00pm",
      },
    ],
    fromTiming: "12:00pm",
    toTiming: "22:00pm",
    dates: [
      {
        date: "2024-03-12",
        bookedSeats: [1, 2, 6],
      },
    ],
    seat: 36,
    hrs: "10h 00m",
    AC: true,
    isSeater: true,
    price: 1000,
  },
];

describe("Search component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      bus: {
        from: "tirunelveli",
        to: "madurai",
        date: "2024-03-12",
        busDetails: mockBusDetails,
      },
    });
    jest.mock("axios", () => ({
      get: jest.fn(() => Promise.resolve({ data: mockBusDetails })),
    }));
  });

  const renderSearchComponent = () => {
    render(
      <Provider store={store}>
        <Router>
          <Search />
        </Router>
      </Provider>
    );
    return waitFor(() => {
      expect(screen.getByText("Tvs travel")).toBeInTheDocument();
    });
  };

  test("example async test", async () => {
    const response = await axios.get("http://localhost:3001/bus");
    expect(response.status).toBe(200);
  });
  test("handle event", async () => {
    await renderSearchComponent();
    userEvent.click(screen.getByText("bookticket"));
  });
  test("allows user to input values in minimum and maximum price fields", async () => {
    await renderSearchComponent();
    const minPriceInput = screen.getByLabelText("Min Price:");
    const maxPriceInput = screen.getByLabelText("Max Price:");
    fireEvent.change(minPriceInput, { target: { value: 100 } });
    fireEvent.change(maxPriceInput, { target: { value: 200 } });
    expect(minPriceInput).toHaveValue(100);
    expect(maxPriceInput).toHaveValue(200);
  });
  test("handles boarding and dropping point changes", async () => {
    await renderSearchComponent();
    const boardingPointCheckbox = screen.getByLabelText("New Bus Stand");
    fireEvent.click(boardingPointCheckbox);
    expect(boardingPointCheckbox.checked).toEqual(true);
    const droppingPointCheckbox = screen.getByLabelText("Mattuthavani");
    fireEvent.click(droppingPointCheckbox);
    expect(droppingPointCheckbox.checked).toEqual(true);
  });
  test("handles the ac and nonac changes and handles the seater and sleeper changes", async () => {
    await renderSearchComponent();
    const acCheckbox = screen.getByLabelText("AC");
    fireEvent.click(acCheckbox);
    expect(acCheckbox.checked).toEqual(true);
    const nonacCheckbox = screen.getByLabelText("NONAC");
    fireEvent.click(nonacCheckbox);
    expect(nonacCheckbox.checked).toEqual(true);
    const seaterCheckbox = screen.getByLabelText("seater");
    fireEvent.click(seaterCheckbox);
    expect(seaterCheckbox.checked).toEqual(true);
    const sleeperCheckbox = screen.getByLabelText("sleeper");
    fireEvent.click(sleeperCheckbox);
    expect(sleeperCheckbox.checked).toEqual(true);
  });
  test("handles booking", async() => {
    await renderSearchComponent();
    fireEvent.click(screen.getByText("bookticket"));
  });
});
