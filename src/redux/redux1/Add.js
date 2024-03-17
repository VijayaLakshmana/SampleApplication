import { createSlice } from "@reduxjs/toolkit"
const initialState={
    value:0
}
const Add=createSlice({
   name:'ad',
   initialState,
   reducers:{
    add:(state,actions)=>{
        state.value+=actions.payload
    }
   }
})
export const {add}=Add.actions
export default Add.reducer
