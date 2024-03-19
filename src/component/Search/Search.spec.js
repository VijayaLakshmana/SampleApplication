import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
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

  test("example async test", async () => {
    const response = await axios.get("http://localhost:3001/bus");
    expect(response.status).toBe(200);
  });


  test("filters buses based on selected options", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("Tvs travel")).toBeInTheDocument();
    });
    userEvent.click(screen.getByLabelText("AC"));
    userEvent.click(screen.getByLabelText("NONAC"));
    userEvent.click(screen.getByLabelText("seater"));
    userEvent.click(screen.getByLabelText("sleeper"));
    expect(screen.getByText("Tvs travel")).toBeInTheDocument();
    expect(screen.queryByText("Aravind travel")).not.toBeInTheDocument();
  });
});
