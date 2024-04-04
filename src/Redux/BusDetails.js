import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  from: "",
  to: "",
  date: "",
  busDetails: [],
  selectedSeats: {},
  selectedBus: null,
  showBoardingPoint: [],
  showDropingPoint: [],
  ticketDetails:[],
};
const busDetails = createSlice({
  name: "bus",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});
export const { updateField } = busDetails.actions;
export default busDetails.reducer;
