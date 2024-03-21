import { createSlice } from "@reduxjs/toolkit";

const createSetter=(key)=>(state,action)=>{
  state[key]=action.payload;
};

export const busDetails = createSlice({
  name: "bus",
  initialState: {
    from: "",
    to: "",
    date: "",
    busDetails: [],
    selectedSeats: {},
    selectedBus: null,
    showBoardingPoint: [],
    showDropingPoint: [],
  },
  // reducers: {
  //   setFrom: (state, action) => {
  //     state.from = action.payload;
  //   },
  //   setTo: (state, action) => {
  //     state.to = action.payload;
  //   },
  //   setDate: (state, action) => {
  //     state.date = action.payload;
  //   },
  //   setBusDetails: (state, action) => {
  //     state.busDetails = action.payload;
  //   },
  //   setSelectedSeats: (state, action) => {
  //     state.selectedSeats = action.payload;
  //   },
  //   setSelectedBus: (state, action) => {
  //     state.selectedBus = action.payload;
  //   },
  //   setShowBoardingPoint: (state, action) => {
  //     state.showBoardingPoint = action.payload;
  //   },
  //   setShowDropingPoint: (state, action) => {
  //     state.showDropingPoint = action.payload;
  //   },
  // },
  reducers:{
    setFrom: createSetter("from"),
    setTo:createSetter("to"),
    setDate:createSetter("date"),
    setBusDetails:createSetter("busDetails"),
    setSelectedSeats:createSetter("selectedSeats"),
    setSelectedBus:createSetter("selectedBus"),
    setShowBoardingPoint:createSetter("showBoardingPoint"),
    setShowDropingPoint:createSetter("showDropingPoint")
  }
});

export const {
  setFrom,
  setTo,
  setDate,
  setBusDetails,
  setSelectedSeats,
  setSelectedBus,
  setShowBoardingPoint,
  setShowDropingPoint,
} = busDetails.actions;

export default busDetails.reducer;
