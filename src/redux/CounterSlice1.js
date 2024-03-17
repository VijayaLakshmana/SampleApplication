import { createSlice } from "@reduxjs/toolkit";
const initialState={
    count:0,
}
const CounterSlice1=createSlice({
    name:'counter1',
    initialState,
    reducers:{
        increment(state) {
            state.count += 1;
          },
          decrement(state){
            state.count-=1;
          }
        }
})
export const{increment,decrement}=CounterSlice1.actions
export default CounterSlice1.reducer;