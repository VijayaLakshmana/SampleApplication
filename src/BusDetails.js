// import { createSlice } from "@reduxjs/toolkit";

// const createSetter=(key)=>(state,action)=>{
//   state[key]=action.payload;
// };

// export const busDetails = createSlice({
//   name: "bus",
//   initialState: {
//     from: "",
//     to: "",
//     date: "",
//     busDetails: [],
//     selectedSeats: {},
//     selectedBus: null,
//     showBoardingPoint: [],
//     showDropingPoint: [],
//   },
//   reducers:{
//     setFrom: createSetter("from"),
//     setTo:createSetter("to"),
//     setDate:createSetter("date"),
//     setBusDetails:createSetter("busDetails"),
//     setSelectedSeats:createSetter("selectedSeats"),
//     setSelectedBus:createSetter("selectedBus"),
//     setShowBoardingPoint:createSetter("showBoardingPoint"),
//     setShowDropingPoint:createSetter("showDropingPoint")
//   }
// });
// export const {
//   setFrom,
//   setTo,
//   setDate,
//   setBusDetails,
//   setSelectedSeats,
//   setSelectedBus,
//   setShowBoardingPoint,
//   setShowDropingPoint,
// } = busDetails.actions;

// export default busDetails.reducer;
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  from: "",
  to: "",
  date: "",
  busDetails: [],
  selectedSeats: {},
  selectedBus: null,
  showBoardingPoint: [],
  showDropingPoint: [],
};

// Create slice
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

// Export action and reducer
export const { updateField } = busDetails.actions;
export default busDetails.reducer;
